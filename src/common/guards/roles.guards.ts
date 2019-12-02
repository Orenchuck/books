import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

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
        // tslint:disable-next-line: no-string-literal
        const userRole: string = payload['roles'];
        const hasRole: boolean = roles.includes(userRole);
        // tslint:disable-next-line: no-string-literal
        return payload['email'] && userRole && hasRole;
    }
}
