import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InstanceType } from 'typegoose';
import { UserRole } from 'src/models/user-role.enum';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/models/user.model';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector, private jwtService: JwtService) { }

    async getUser(context: ExecutionContext): Promise<UserModel> {
        const request = context.switchToHttp().getRequest();
        console.log(request.user);

        return request.user;
    }

    async getUserRoles(context: ExecutionContext): Promise<string | string[]> {
        const user = await this.getUser(context);
        if (!user) throw new Error();
        return user.roles;
    }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        console.log('roles ' + roles);

        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const headers: string = request.headers.authorization;
        console.log(headers);
        
        if (!headers) {
            return false;
        }

        const token: string = headers.replace('Bearer ', '');
        const payload = this.jwtService.decode(token);
        console.log(payload);
        
        // tslint:disable-next-line:no-string-literal
        const userRole = payload['roles'];
        console.log(userRole);
        
        const hasRole: boolean = roles.includes(userRole);
        console.log(hasRole);
        

        return hasRole;
    }
}
