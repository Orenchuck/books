import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InstanceType } from 'typegoose';
import { UserRole } from 'src/models/user-role.enum';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const headers: string = request.headers.authorization;

        if (!headers) {
            return false;
        }

        const token: string = headers.replace('Bearer ', '');
        const payload = this.jwtService.decode(token);
        const userRole = payload['roles'];
        const hasRole: boolean = roles.includes(userRole);
        return payload['email'] && userRole && hasRole;
    }
}
