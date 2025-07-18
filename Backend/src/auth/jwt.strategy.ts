// src/auth/jwt.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) { // Corrected parameter name to match common practice
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Ensure this matches your .env JWT_SECRET
    });
  }

  async validate(payload: any) {
    const userIdFromPayload = payload.userId; // Correctly access the 'userId' property

    if (!userIdFromPayload) {
      console.error('JWT Payload missing user ID field.');
      throw new UnauthorizedException('Invalid token payload: User ID missing.');
    }

    // Now, verify this user exists in your database
    // Assuming your UsersService has a method to find a user by their ID
    const user = await this.usersService.getUserById(userIdFromPayload); // Use the correct method name from your UsersService
    if (!user) {
      console.error(`User with ID ${userIdFromPayload} not found in DB.`);
      throw new UnauthorizedException('User associated with token not found.');
    }
    return { id: user.id, email: user.email }; // Return the actual user ID as 'id' for req.user.id
  }
}