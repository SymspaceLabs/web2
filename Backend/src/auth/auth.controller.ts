import {
  Body,
  Controller,
  Post,
  UseGuards,
  Res,
  Req,
  Get,
  HttpStatus,
  Query,
  BadRequestException,
  HttpCode,
  UnauthorizedException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';
import { MailchimpService } from 'src/mailchimp/mailchimp.service';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';


@Controller('auth')
export class AuthController {
  usersService: UsersService;
  constructor(
    private authService: AuthService,
    private mailChimpService: MailchimpService,
    private jwtService: JwtService,
  ) {}

  // 1. Login
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // 2. Sign Up
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    const result = await this.authService.signUp(signUpDto);
    if (result.token) {
      return res.status(HttpStatus.CREATED).json(result);
    } else {
      return res.status(HttpStatus.CONFLICT).json(result);
    }
  }

  // 3. Signup as a Seller
  @Post('signup-seller')
  async signUpSeller(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    const result = await this.authService.signUpSeller(signUpDto);
    if (result.token) {
      return res.status(HttpStatus.CREATED).json(result);
    } else {
      return res.status(HttpStatus.CONFLICT).json(result);
    }
  }

  // 4. Verify OTP
  @Post('verify-otp')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto);
  }

  // 5. Resend OTP
  @Post('resend-otp')
  async resendOtp(@Body() resendOtpDto: any) {
    return this.authService.resendOtp(resendOtpDto);
  }

  // 6. Forgot Password
  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    try {
      await this.authService.generateResetPasswordOtp(email);
      return {
        message: 'An OTP has been sent to your mailbox.',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // 7. Verify Forgot Password OTP
  @Post('verify-forgot-password-otp')
  async verifyForgotPasswordOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyResetPasswordOtp(verifyOtpDto);
  }

  // 8. Resend Forgot Password OTP
  @Post('resend-forgot-password-otp')
  async resendResetPasswordOtp(@Body('email') email: string) {
    try {
      await this.authService.resendResetPasswordOtp(email);
      return { 
        message: 'A new password reset OTP has been sent to your email.'
      };
    } catch (error) {
      // Catch specific exceptions thrown by the service layer
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new HttpException(
        'An unexpected error occurred while resending password reset OTP.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 9. Reset Password
  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  // 10. Google Login
  @Post('login/google')
  @HttpCode(HttpStatus.OK)
  async loginWithGoogle(@Body('idToken') idToken: string) {
    try {
      return await this.authService.loginWithGoogle(idToken);
    } catch (error) {
      throw new UnauthorizedException('Google authentication failed');
    }
  }

  // 11. Apple Login
  @Post('login/apple')
  @HttpCode(HttpStatus.OK)
  async loginWithApple(@Body('idToken') idToken: string) {
    try {
      return await this.authService.loginWithApple(idToken);
    } catch (error) {
      throw new UnauthorizedException('Apple authentication failed');
    }
  }

  // 12. Facebook Login
  @Post('login/facebook')
  @HttpCode(HttpStatus.OK)
  async loginWithFacebook(@Body('accessToken') accessToken: string) {
    try {
      return await this.authService.loginWithFacebook(accessToken);
    } catch (error) {
      if (error.response?.status === 400 && error.response?.data?.error?.type === 'OAuthException') {
        throw new UnauthorizedException('Invalid or expired Facebook access token');
      }
      throw new UnauthorizedException('Facebook authentication failed');
    }
  }

  // 13. Change Password
  @Post('change-password')
  @UseGuards(AuthGuard('jwt'))
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,  // Body contains the change password request
    @Req() req: any,  // Request object, contains user info
  ) {
    const { currentPassword, newPassword } = changePasswordDto;
    const userId = req.user.id;  // Extract user ID from the decoded JWT token
    return await this.authService.changePassword(userId, currentPassword, newPassword);
  }

  // 14. Logout
  @Get('logout') 
  async logout(@Req() req: Request, @Res() res: Response) {
    res.clearCookie('auth_token', { path: '/', httpOnly: true, sameSite: 'lax' });
    res.status(200).json({ 
      message: 'Logged out successfully' 
    });
  }

  // @Post('/send-email')
  // async sendEmail(
  //   @Body('email') email: string,
  //   @Body('verificationUrl') verificationUrl: string,
  // ) {
  //   return this.mailChimpService.sendEmail(email, verificationUrl);
  // }



  // @Post('resend-verification')
  // async resendVerification(@Body() resendVerificationDto: any) {
  //   const { email } = resendVerificationDto;
  //   const user = await this.authService.findUserByEmail(email);

  //   if (!user) {
  //     throw new HttpException(
  //       'User not found. Please register first.',
  //       HttpStatus.NOT_FOUND,
  //     );
  //   }
    
  //   if (user.isVerified) {
  //     throw new HttpException(
  //       'Account is already verified.',
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }

  //   // Resend the verification email
  //   const success = await this.authService.sendVerificationEmail(user);
  //   if (!success) {
  //     throw new HttpException(
  //       'Failed to send verification email. Please try again later.',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }

  //   return {
  //     message: 'Verification email has been resent successfully.',
  //     status: 'success',
  //   };
  // }

  // @Get('verify-email')
  // async verifyEmail(@Query('token') token: string, @Res() res) {
  //   const { role } = this.jwtService.verify(token);
  //   try {
  //     await this.authService.verifyEmail(token);
  //     let redirectUrl: string;
  //     if (role === 'seller') {
  //       redirectUrl = `${process.env.BUYER_URL}/vendor/dashboard`;
  //     } else {
  //       redirectUrl = `${process.env.BUYER_URL}/sign-in`;
  //     }
  //     return res.redirect(redirectUrl);
  //   } catch (error) {
  //     return res.redirect(
  //       `${process.env.BUYER_URL}/email-verification-failed`,
  //     );
  //   }
  // }
}
