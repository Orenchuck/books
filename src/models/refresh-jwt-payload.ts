export interface RefreshJwtPayload {
    email: string;
    isAccess?: boolean;
    iat?: Date;
}
