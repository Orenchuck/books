import * as mongoose from 'mongoose';
import { UserSchema, UserDocument } from 'src/documents/user.document';
import { Injectable } from '@nestjs/common';
import { Model, objectid } from 'mongoose';

@Injectable()
export class UserRepository {

    private userModel: Model<UserDocument>;

    constructor() {
        this.userModel = mongoose.model('User', UserSchema);
    }

    async findOneByEmail(email: string): Promise<UserDocument> {
        const res: UserDocument = await this.userModel.findOne({ email }).exec();
        return res;
    }

    async getAllUsers(): Promise<UserDocument[]> {
        const allUsers: UserDocument[] = await this.userModel.find().exec();
        return allUsers;
    }

    async getUserbyID(id: objectid): Promise<UserDocument> {
       const user: UserDocument = await this.userModel.findById(id).exec();
       return user;
    }

    async deleteUser(id: objectid) {
        const result = await this.userModel.deleteOne({ _id: id }).exec();
        return result;
    }

}
