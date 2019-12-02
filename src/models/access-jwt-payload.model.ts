export interface AccessJwtPayload {
    email: string;
    roles?: string[];
    isAccess?: boolean;
    iat?: Date;
}
