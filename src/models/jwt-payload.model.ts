export interface JwtPayload {
    email: string;
    roles?: string[];
    isDel?: boolean;
    iat?: Date;
}
