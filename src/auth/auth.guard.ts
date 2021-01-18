import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';
import { HAS_PERMISSION_KEY } from './permission.decorator';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check the secure property is set false or not
    // If secure property is false, allow all the requests.
    if (process.env.SECURE !== 'true') {
      return true;
    }

    // Retrive Public Decorator metadata
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Retrive HasPermission Decorator metadata
    const permissions = this.reflector.getAllAndOverride<string[]>(
      HAS_PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    let cookieToken = '';
    try {
      cookieToken = context.switchToHttp().getRequest().cookies['token'];
    } catch (err) {
      throw new Error('Cookie is not parsed!');
    }

    const bearerToken = context
      .switchToHttp()
      .getRequest()
      .headers['authorization']?.split(' ')[1];

    const token = cookieToken || bearerToken;

    if (!token) {
      return false;
    }

    const user = await this.authService.verifyToken(token);

    if (!permissions || permissions.length == 0) {
      return true;
    }

    for (const permission of permissions) {
      if (!user.permissions.includes(permission)) {
        return false;
      }
    }
    return true;
  }
}
