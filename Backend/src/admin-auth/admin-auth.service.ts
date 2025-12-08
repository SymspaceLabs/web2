import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/auth/dto/login.dto';
import { UserRole } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AdminAuthService {
  constructor(
    private usersService: UsersService, // To find and validate user
    private jwtService: JwtService,     // To generate the token
  ) {}

  async adminLogin(loginDto: LoginDto): Promise<{ accessToken?: string, user?: any, error?: string }> {
    const { email, password } = loginDto;
    
    // 1. Find the user by email
    const user = await this.usersService.findByEmail(email); // Assuming you have this method

    if (!user) {
      return { error: 'Invalid credentials 1' };
    }

    // 2. Validate the password (you should use a hashing comparison here)
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return { error: 'Invalid credentials' };
    }

    // 🌟 3. CRITICAL AUTHORIZATION CHECK: Ensure the user is an administrator
    if (user.role !== UserRole.ADMIN && user.role !== UserRole.SUPER_ADMIN) {
      // Log the attempt for security monitoring
      console.warn(`Non-admin user ${email} attempted to log into the admin panel.`);
      return { error: 'Unauthorized access: Account does not have administrative privileges' };
    }

    // 4. Generate the token (Ensure role is included in payload)
    const payload = { 
        userId: user.id, 
        email: user.email, 
        role: user.role 
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}