import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AdminUsersService {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Retrieves all user accounts in the system.
   * NOTE: The controller ensures only Admins can call this.
   */
  async findAllUsers() {
    // This is where you might call a method from your core UsersService
    // that fetches ALL users, including sensitive data.
    return this.usersService.getAllUsers(); 
  }

  async findOneUser(id: string) {
    // 1. Fetch the user from the database
    const user = await this.usersService.getUserById(id);

    // 2. Handle not found scenario
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return user;
  }

  /**
   * Example: A sensitive admin action.
   */
  async banUser(userId: number) {
    // Logic to update user status in the database
    // return this.usersService.update(userId, { status: 'banned' });
    return { 
      message: `User ${userId} has been banned. (Service Logic)` 
    };
  }
}