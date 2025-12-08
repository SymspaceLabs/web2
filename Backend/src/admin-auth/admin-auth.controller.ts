import {
  Body,
  Controller,
  Post,
  HttpStatus,
  HttpCode,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { LoginDto } from 'src/auth/dto/login.dto'; // Reusing the general Login DTO
// We remove: CreateAdminAuthDto and UpdateAdminAuthDto as they are not needed for login

@Controller('admin/auth') // ⬅️ IMPORTANT: Using the specific 'admin/auth' prefix
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  /**
   * Handles Admin Login and issues a JWT token with the admin role.
   * Route: POST /admin/auth/login
   */
  @Post('login')
  @HttpCode(HttpStatus.OK) // HTTP 200 on successful login
  async login(@Body() loginDto: LoginDto) {
    // Calls the service logic to authenticate and check the role
    const result = await this.adminAuthService.adminLogin(loginDto);

    if (result.error) {
      // Throw 401 Unauthorized if the credentials fail or the user lacks the admin role
      throw new UnauthorizedException(result.error);
    }

    // Returns the JWT token, which the frontend will use for protected routes
    return result;
  }
}