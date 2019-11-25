import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { UserSchema, UserDocument } from 'src/documents/user.document';
import { Model } from 'mongoose';

@Injectable()
export class AuthRepository {

    private userModel: Model<UserDocument>;

    constructor() {
        this.userModel = mongoose.model('User', UserSchema);
    }

    async verifyEmail(cypher: string): Promise<UserDocument> {
        const emailVerif = await this.userModel.findOne({ cypher });
        return emailVerif;
    }

    async saveUser(user) {
        try {
            const res = await user.save();
            return true;
        } catch { throw new HttpException('error connection with db', HttpStatus.FORBIDDEN); }
    }
}
