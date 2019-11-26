import { UserRole } from 'src/models/user-role.enum';

export interface JwtPayload {
    email: string;
    roles?: string[];
    isDel?: boolean;
    iat?: Date;
}
