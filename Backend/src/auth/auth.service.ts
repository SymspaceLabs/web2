import {
  Injectable,
  UnauthorizedException,
  Logger,
  HttpException,
  ForbiddenException,
  PayloadTooLargeException,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import User, { AuthMethod } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Auth } from './entities/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { MailchimpService } from '../mailchimp/mailchimp.service';
import { Company } from 'src/companies/entities/company.entity';
import { RedisService } from '../redis/redis.service';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import * as validator from 'validator';
import * as bcrypt from 'bcrypt';
import * as jwksClient from 'jwks-rsa';
import axios from 'axios';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';


@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
    
    private jwtService: JwtService,
    private redisService: RedisService,
    private readonly mailchimpService: MailchimpService,

  ) {}

  private appleClient = jwksClient({
      jwksUri: 'https://appleid.apple.com/auth/keys',
  });

  async getApplePublicKey(kid: string): Promise<string> {
      const key = await this.appleClient.getSigningKey(kid);
      return key.getPublicKey();
  }

  private validateFields(
    fields: Record<string, any>,
    requiredFields: string[],
  ): string[] {
    const missingFields = requiredFields.filter((field) => !fields[field]);
    return missingFields;
  }

  async generateUniqueSlug(
    entityName: string,
    companiesRepository: any,
  ): Promise<string> {
    const baseSlug = entityName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with dash
      .replace(/^-+|-+$/g, '');    // remove leading/trailing dashes
  
    let slug = baseSlug;
    let counter = 1;
  
    while (await companiesRepository.findOne({ where: { slug } })) {
      slug = `${baseSlug}-${counter++}`;
    }
  
    return slug;
  }
  
  private validatePasswordFormat(password: string): void {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#+])[A-Za-z\d@$!%*?&#+]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new ForbiddenException(
        'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.',
      );
    }
  }

  private async parseJWT(idToken: string): Promise<any> {
    try {
      const decodedHeader: any = jwt.decode(idToken, { complete: true });
      const payload = decodedHeader.payload;
      const { sub, email, email_verified, name, picture, given_name, family_name } = payload;

      return {
        userId: sub,
        email,
        emailVerified: email_verified,
        name,
        firstName: given_name,
        lastName: family_name,
        picture,
      }
    } catch (error) {
      throw new Error('Invalid ID token');
    }
  }

  private async generateOtp() {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date();
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 10); // OTP valid for 10 mins
    return {
      otp,
      otpExpiresAt
    }
  }

  async signUpSeller(
    signUpDto: SignUpDto,
  ): Promise<{ message: string; token?: string }> {
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'password',
      'businessName',
      'website',
      'location',
      'ein'
    ];
  
    const missingFields = this.validateFields(signUpDto, requiredFields);
  
    if (missingFields.length > 0) {
      throw new UnauthorizedException(
        `Missing required field(s): ${missingFields.join(', ')}.`,
      );
    }
  
    const { password, email } = signUpDto;
  
    if (!validator.isEmail(email)) {
      throw new HttpException('Invalid email address.', 402);
    }
  
    this.validatePasswordFormat(password);
  
    const { firstName, lastName, role = 'seller', businessName, website, location, ein } =
      signUpDto;
  
    const existingUser = await this.usersRepository.findOne({
      where: { email }, relations: ['company']
    });
  
    if (existingUser) {
      return { message: 'Email already exists. Please use a different email.' };
    }

    // ✅ CHECK BUSINESS NAME BEFORE SAVING USER
    const existingCompany = await this.companiesRepository.findOne({
      where: { entityName: businessName.trim().toLowerCase() },
    });

    if (existingCompany) {
      throw new ConflictException('Business name already exists. Please choose another.');
    }
  
    // ✅ ONLY THEN continue to save user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a 6-digit OTP
    const { otp, otpExpiresAt } = await this.generateOtp();

    const user = this.usersRepository.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      otp,
      otpExpiresAt,
      isVerified: false
    });
  
    await this.usersRepository.save(user);
  
    // ✅ Then create the company
    if (role === 'seller') {
      const slug = await this.generateUniqueSlug(businessName, this.companiesRepository);

      const company = this.companiesRepository.create({
        userId: user.id,
        entityName: businessName,
        website,
        location,
        ein,
        slug,
      });
      await this.companiesRepository.save(company);
    }
  
    const token = this.jwtService.sign(
      { userId: user.id, email: user.email, role: user.role },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );
  
    await this.mailchimpService.sendOtpEmail(
      email,
      'Your OTP for Account Verification',
      otp
    );
  
    return {
      message:
        'Registration successful. Please check your email to verify your account.',
      token,
    };
  }

  async signUp(
    signUpDto: SignUpDto,
  ): Promise<{ message: string; token?: string }> {
    
    try {
      const requiredFields = ['firstName', 'lastName', 'email', 'password'];
      const missingFields = this.validateFields(signUpDto, requiredFields);
      const { password, email } = signUpDto;
    
      // Check for missing inputs
      if (missingFields.length > 0) {
        throw new UnauthorizedException(
          `Missing required field(s): ${missingFields.join(', ')}.`,
        );
      }
    
      // Validate email format
      if (!validator.isEmail(email)) {
        throw new HttpException('Invalid email address.', 402); // Custom 402 error
      }
    
      // Validate password format
      this.validatePasswordFormat(password);
    
      const { firstName, lastName, role = 'buyer' } =
        signUpDto;
    
      // ✅ 1. Check if email already exists
      const existingUser = await this.usersRepository.findOne({
        where: { email },
      });
    
      if (existingUser) {
        return { message: 'Email already exists. Please use a different email.' };
      }
    
      // ✅ ONLY THEN continue to save user
      const hashedPassword = await bcrypt.hash(password, 10);

      // Generate a 6-digit OTP
      const { otp, otpExpiresAt } = await this.generateOtp();
    
      const user = this.usersRepository.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
        otp,
        otpExpiresAt,
        isVerified: false, // New column to track verification status
      });
    
      await this.usersRepository.save(user);
        
      const token = this.jwtService.sign(
        { userId: user.id, email: user.email, role: user.role },
        { secret: process.env.JWT_SECRET, expiresIn: '1h' },
      );
    
      await this.mailchimpService.sendOtpEmail(
        email,
        'Your OTP for Account Verification',
        otp
      );
    
      return {
        message:
          'Registration successful. Please check your email to verify your account.',
        token,
      };
    } catch (error) {
      console.error('Signup error:', error);
  
      if (error instanceof HttpException) {
        throw error; // rethrow known errors
      }
  
      throw new HttpException(
        'An unexpected error occurred during signup. Please try again later.',
        500,
      );
    }
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<{ message: string; accessToken: string; user: any }> {
    const { email, otp } = verifyOtpDto;

    // Find the user
    const user = await this.usersRepository.findOne({
      where: { email }, relations: ['company']
    });

    if (!user) {
        throw new NotFoundException('User not found.');
    }

    // Check if OTP matches and hasn't expired
    if (!user.otp || user.otp !== otp || new Date() > user.otpExpiresAt) {
        throw new BadRequestException('Invalid or expired OTP.');
    }

    // Mark the user as verified
    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await this.usersRepository.save(user);

    // Generate JWT token
    const accessToken = this.jwtService.sign(
        { userId: user.id, email: user.email },
        { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );

    // Store token in Redis (optional)
    await this.redisService.getClient().set(`auth:${user.id}`, accessToken, 'EX', 3600);

    // Save token as refresh token (optional)
    await this.authRepository.update(user.id, { refreshToken: accessToken });

    return {
        message: 'OTP verified successfully! You are now logged in.',
        accessToken,
        user: {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            isOnboardingFormFilled: user.isOnboardingFormFilled,
            company : user.company,
        },
    };
  }

  async verifyResetPasswordOtp(verifyOtpDto: VerifyOtpDto): Promise<{ message: string }> {
    const { email, otp } = verifyOtpDto;

    // Find the user
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
        throw new NotFoundException('User not found.');
    }

    // Check if OTP matches and hasn't expired
    if (!user.otp || user.otp !== otp || new Date() > user.otpExpiresAt) {
        throw new BadRequestException('Invalid or expired OTP.');
    }

    // OTP verified, allow user to proceed to reset password
    user.isVerified = true;
    user.otpExpiresAt = null;
    await this.usersRepository.save(user);

    return {
        message: 'OTP verified successfully!',
    };
  }

  async resendOtp(resendOtpDto: any): Promise<{ message: string }> {

    const { email } = resendOtpDto;

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found.');
    }
  
    if (user.isVerified) {
      throw new BadRequestException('User is already verified.');
    }
  
    // Check rate limit in Redis
    const redisKey = `otp-resend:${email}`;
    const requestCount = await this.redisService.getClient().get(redisKey);
  
    if (requestCount && parseInt(requestCount) >= 3) {
      throw new BadRequestException('Too many OTP requests. Please try again later.');
    }
  
    // Generate and save OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiresAt = new Date();
    otpExpiresAt.setMinutes(otpExpiresAt.getMinutes() + 10);
  
    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await this.usersRepository.save(user);
  
    // Increase request count in Redis (expires in 5 minutes)
    await this.redisService.getClient().incr(redisKey);
    await this.redisService.getClient().expire(redisKey, 300); // 5-minute expiry
  
    // Send OTP email
    await this.mailchimpService.sendOtpEmail(email, 'Your New OTP for Account Verification', otp);
  
    return { message: 'A new OTP has been sent to your email.' };
  }

  async login(loginDto: LoginDto): Promise<{ message:string, accessToken: string; user: any }> {
    const { email, password } = loginDto;

    const user =  await this.usersRepository.findOne({
      where: { email }, relations: ['company']
    });

    if (!user) {
      throw new UnauthorizedException('No account found with this email. Please sign up or try a different email.');
    }

    if (!user.isVerified) {
      throw new PayloadTooLargeException('Your email is not verified. Please check your inbox to verify your email.');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid password');
    }

    const accessToken = this.jwtService.sign(
      { userId: user.id, email: user.email },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );

    await this.redisService
      .getClient()
      .set(`auth:${user.id}`, accessToken, 'EX', 3600);

    await this.authRepository.update(user.id, { refreshToken: accessToken });

    return {
      message: 'Login successful!',
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isOnboardingFormFilled: user.isOnboardingFormFilled,
        company: user.company
      },
    };
  }

  async loginWithGoogle(idToken: string) {
    
    let googleUser;

    try {
        googleUser = await this.parseJWT(idToken);
    } catch (error) {
        throw new UnauthorizedException('Invalid Google ID token.');
    }
    

    const { email } = googleUser;

    let user = await this.usersRepository.findOne({
      where: { email },
    });

    try {
      if (!user) {
        user = this.usersRepository.create({
            email: googleUser.email,
            firstName: googleUser.firstName || '',
            lastName: googleUser.lastName || '',
            avatar: googleUser.picture || '',
            isVerified: true,
            role: 'buyer',
            password: '', // Password is not used for social logins
            authMethod: AuthMethod.GOOGLE,
        });
        await this.usersRepository.save(user); 
      }
    } catch (error) {
      throw new InternalServerErrorException('Failed to process user. Please try again.');
    }

    // Ensure user object is valid before proceeding
    if (!user || !user.id || !user.email) {
        throw new InternalServerErrorException('User data not available for token generation.');
    }

    const accessToken = this.jwtService.sign(
      { userId: user.id, email: user.email },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );

    // Store the token in Redis
    try {
      await this.redisService
        .getClient()
        .set(`auth:${user.id}`, accessToken, 'EX', 3600);

      } catch (redisError) {
        this.logger.error(`loginWithGoogle: Failed to store token in Redis for user ID ${user.id}: ${redisError.message}`, redisError.stack);
    }


    try {
        await this.authRepository.update(user.id, { refreshToken: accessToken });
    } catch (authRepoError) {
        this.logger.error(`loginWithGoogle: Failed to update auth repository for user ID ${user.id}: ${authRepoError.message}`, authRepoError.stack);
    }

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        avatar: user.avatar,
        isOnboardingFormFilled: user.isOnboardingFormFilled,
      },
    };
  }

  async loginWithApple(idToken: string) {
    const decodedHeader: any = jwt.decode(idToken, { complete: true });

    if (!decodedHeader || !decodedHeader.header || !decodedHeader.header.kid) {
      throw new UnauthorizedException('Invalid token');
    }

    const publicKey = await this.getApplePublicKey(decodedHeader.header.kid);

    try {
      const verifiedPayload:any = jwt.verify(idToken, publicKey, {
          algorithms: ['RS256'],
          issuer: 'https://appleid.apple.com',
          audience: 'com.symspacelabs.si', // Replace with your client ID
      });

      const { email } = verifiedPayload;

      let user = await this.usersRepository.findOne({
        where: { email },
      });

      if (!user) {
        user = this.usersRepository.create({
            email: email,
            firstName: verifiedPayload.firstName || '',
            lastName: verifiedPayload.lastName || '',
            avatar: verifiedPayload.picture || '',
            isVerified: true,
            role: 'buyer',
            password: '',
            authMethod: AuthMethod.APPLE,
        });
  
        await this.usersRepository.save(user);
      }

      const accessToken = this.jwtService.sign(
        { userId: user.id, email: user.email },
        { secret: process.env.JWT_SECRET, expiresIn: '1h' },
      );

      // Store the token in Redis
      await this.redisService
      .getClient()
      .set(`auth:${user.id}`, accessToken, 'EX', 3600);

      await this.authRepository.update(user.id, { refreshToken: accessToken });

      console.log(accessToken);

      return {
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          avatar: user.avatar,
          isOnboardingFormFilled: user.isOnboardingFormFilled,
          token: accessToken
        },
      };


      } catch (err) {
        throw new UnauthorizedException('Invalid token 2');
    }
  }

  async loginWithFacebook(accessToken: string) {
    try {
      // Fetch user info from Facebook
      const userInfoUrl = `https://graph.facebook.com/me?fields=id,first_name,last_name,email,picture&access_token=${accessToken}`;
      const userInfoResponse: any = await axios.get(userInfoUrl);
  
      const { email, first_name, last_name, picture } = userInfoResponse.data;
  
      // Check if user exists in the database
      let user = await this.usersRepository.findOne({
        where: { email },
      });
  
      if (!user) {
        // Create a new user if not found
        user = this.usersRepository.create({
          email: email,
          firstName: first_name || '',
          lastName: last_name || '',
          avatar: picture?.data?.url || '',
          isVerified: true,
          role: 'buyer',
          password: '',
          authMethod: AuthMethod.FACEBOOK,
        });
  
        await this.usersRepository.save(user);
      }
  
      // Generate a new access token
      const newAccessToken = this.jwtService.sign(
        { userId: user.id, email: user.email },
        { secret: process.env.JWT_SECRET, expiresIn: '1h' },
      );
  
      // Store the token in Redis
      await this.redisService
        .getClient()
        .set(`auth:${user.id}`, newAccessToken, 'EX', 3600);
  
      await this.authRepository.update(user.id, { refreshToken: newAccessToken });
  
      // Return the access token and user info
      return {
        accessToken: newAccessToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          avatar: user.avatar,
          isOnboardingFormFilled: user.isOnboardingFormFilled,
        },
      };
    } catch (error) {
      if (error.response?.data?.error?.type === 'OAuthException') {
        throw new UnauthorizedException('Invalid or expired Facebook access token');
      }
      throw new InternalServerErrorException('Error handling Facebook login');
    }
  }
  
  // async verifyEmail(token: string): Promise<boolean> {
  //   try {
  //     const { email } = this.jwtService.verify(token);
  //     const user = await this.usersRepository.findOne({ where: { email } });
  //     if (!user) throw new HttpException('User not found', 404);
  //     user.isVerified = true;
  //     await this.usersRepository.save(user);
  //     return true;
  //   } catch (error) {
  //     this.logger.error(`Email verification failed: ${error.message}`);
  //     if (error.name === 'TokenExpiredError') {
  //       throw new HttpException(
  //         'Email verification token has expired. Please request a new verification link.',
  //         441,
  //       );
  //     } else {
  //       throw new HttpException(
  //         'Invalid verification token.',
  //         400,
  //       );
  //     }
  //   }
  // }

  async generateResetPasswordOtp(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { email } });
    
    if (!user) {
      throw new HttpException('No account found with this email. Please verify your email and try again.', 421);
    }

    // Generate a 6-digit OTP
    const { otp, otpExpiresAt } = await this.generateOtp();

    // Update User Data
    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await this.usersRepository.save(user);
  
    // Send OTP via Email
    await this.mailchimpService.sendOtpEmail(
      email,
      'Your OTP for Reset Password',
      otp
    )
  }

  async generateResetToken(email: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { email } });
    
    if (!user) {
      throw new HttpException('No account found with this email. Please verify your email and try again.', 421);
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 1);

    user.resetToken = token;
    user.resetTokenExpiry = expiry;
    await this.usersRepository.save(user);

    await this.mailchimpService.sendPasswordResetEmail(email, token);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{ message: string }> {
    const { email, otp, newPassword } = resetPasswordDto;

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('No account found with this email.', 404);
    }

    // Check if OTP matches and is not expired
    if (!user.otp || user.otp !== otp) {
      throw new HttpException('Invalid OTP. Please enter the correct OTP.', 400);
    }

    const now = new Date();
    if (user.otpExpiresAt && user.otpExpiresAt < now) {
      throw new HttpException('OTP has expired. Request a new one.', 400);
    }

    // Hash new password
    user.password = await bcrypt.hash(newPassword, 10);

    // Clear OTP fields after successful password reset
    user.otp = null;
    user.otpExpiresAt = null;
    await this.usersRepository.save(user);

    return { message: 'Password has been reset successfully. You can now log in with your new password.' };
  }  
  
  /**
   * Resends an OTP for password reset requests.
   * Includes a rate limit to prevent abuse.
   * @param email The email address of the user requesting OTP resend.
   * @returns A message indicating the success of the OTP resend.
   * @throws NotFoundException if the user is not found.
   * @throws BadRequestException if too many OTP requests have been made.
   */
  async resendResetPasswordOtp(email: string): Promise<{ message: string }> {
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    // Rate limit for password reset OTP requests
    const redisKey = `password-reset-otp-resend:${email}`;
    const requestCount = await this.redisService.getClient().get(redisKey);

    if (requestCount && parseInt(requestCount) >= 3) {
      throw new BadRequestException('Too many password reset OTP requests. Please try again later.');
    }

    // Generate a new OTP
    const { otp, otpExpiresAt } = await this.generateOtp();

    // Update user with new OTP
    user.otp = otp;
    user.otpExpiresAt = otpExpiresAt;
    await this.usersRepository.save(user);

    // Increase request count in Redis (expires in 5 minutes)
    await this.redisService.getClient().incr(redisKey);
    await this.redisService.getClient().expire(redisKey, 300); // 5-minute expiry

    // Send OTP email
    await this.mailchimpService.sendOtpEmail(email, 'Your New OTP for Password Reset', otp);

    return { message: 'A new password reset OTP has been sent to your email.' };
  }



  async validateGoogleUser(googleUser: any): Promise<any> {
    let user = await this.authRepository.findOne({
      where: { email: googleUser.user.email },
    });

    if (!user) {
      user = this.authRepository.create({
        email: googleUser.user.email,
        firstName: googleUser.user.firstName,
        lastName: googleUser.user.lastName,
        isVerified: true,
        role: 'buyer',
        password: null,
      });
      await this.authRepository.save(user);
    } else {
      await this.authRepository.update(user.id, {
        email: googleUser.user.email,
        firstName: googleUser.user.firstName,
        lastName: googleUser.user.lastName,
        isVerified: true,
        role: 'buyer',
        password: null,
      });
      await this.authRepository.save(user);
    }

    let userData = await this.usersRepository.findOne({
      where: { email: googleUser.user.email },
    });
    if (!userData) {
      userData = this.usersRepository.create({
        email: googleUser.user.email,
        firstName: googleUser.user.firstName,
        lastName: googleUser.user.lastName,
        isVerified: true,
        role: 'buyer',
        password: 'buyer123',
      });
      await this.usersRepository.save(userData);
    } else {
      await this.usersRepository.update(userData.id, {
        email: googleUser.user.email,
        firstName: googleUser.user.firstName,
        lastName: googleUser.user.lastName,
        isVerified: true,
      });
      await this.usersRepository.save(userData);
    }

    const payload = { userId: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });

    // Store the token in Redis
    await this.redisService
      .getClient()
      .set(`auth:${user.id}`, token, 'EX', 3600);

    await this.authRepository.update(user.id, { refreshToken: token });

    console.log('reslocal', user);
    return {
      user: {
        ...user,
        refreshToken: token,
      },
      token,
    };
  }

  async logout(userId: string): Promise<void> {
    try {
      const redisClient = this.redisService.getClient();
      await redisClient.del(`auth:${userId}:access`);
      await redisClient.del(`auth:${userId}:refresh`);
      await this.authRepository.update(userId, { refreshToken: null });
      this.logger.log(`User logged out: ${userId}`);
    } catch (error) {
      this.logger.error(`Error in logout: ${error.message}`, error.stack);
      throw error;
    }
  }

  async changePassword(userId: string, currentPassword: string, newPassword: string) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found.');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    
    if (!isMatch) {
      throw new BadRequestException('Current password is incorrect.');
    }

    if (currentPassword === newPassword) {
      throw new BadRequestException('New password cannot be the same as the current password.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await this.usersRepository.save(user);

    return { message: 'Password updated successfully!' };
  }

  async findUserByEmail(email: string) {
    const user = this.usersRepository.findOne({
      where: { email },
    });

    return user;
  }

  async sendVerificationEmail(user: any): Promise<boolean> {
    try {
      const token = this.generateVerificationToken(user); // Implement token generation
      const verificationUrl = `${process.env.BACKEND_URL}/auth/verify-email?token=${token}`;
      await this.mailchimpService.sendVerificationEmail(user.email, verificationUrl)
      return true;
    } catch (error) {
      console.error('Failed to send verification email:', error);
      return false;
    }
  }

  private generateVerificationToken(user: any): string {
    const token = this.jwtService.sign(
      { userId: user.id, email: user.email, role: user.role },
      { secret: process.env.JWT_SECRET, expiresIn: '1h' },
    );
    return token;
  }

}
