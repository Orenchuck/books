import { UserRole } from 'src/models/user-role.enum';

export interface JwtPayload {
    email: string;
    role?: UserRole;
    iat?: Date;
}
