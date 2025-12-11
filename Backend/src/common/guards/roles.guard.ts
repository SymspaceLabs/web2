import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/users/entities/user.entity';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Get required roles metadata from the route handler
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [
        context.getHandler(), // Check method handler
        context.getClass(),   // Check controller class
      ],
    );

    // If no roles are set, the route is public (or protected by other guards)
    if (!requiredRoles) {
      return true;
    }

    // 2. Get the authenticated user object
    const { user } = context.switchToHttp().getRequest();

    // 3. Check if the user's role matches any of the required roles
    const hasRequiredRole = requiredRoles.some((role) => user.role === role);

    if (!hasRequiredRole) {
      throw new ForbiddenException('You do not have the required role to access this resource.');
    }

    return true;
  }
}