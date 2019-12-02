import * as mongoose from 'mongoose';
import { UserSchema, UserDocument } from 'src/documents/user.document';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Model, objectid } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {

    private userModel: Model<UserDocument>;

    constructor() {
        this.userModel = mongoose.model('User', UserSchema);
    }

    async create(user, cypher): Promise<UserDocument> {
        try {
            const saltRounds = 10;
            const createdUser = new this.userModel(user);
            createdUser.password = await bcrypt.hash(createdUser.password, saltRounds);
            createdUser.roles = 'User';
            createdUser.cypher = cypher;
            createdUser.active = false;
            createdUser.isDel = false;
            const newUser: UserDocument = await createdUser.save();

            return newUser;
        } catch { throw new HttpException('Error connection with db', HttpStatus.FORBIDDEN); }
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
        try {
            const user: UserDocument = await this.userModel.findById(id).exec();
            return user;
        } catch { throw new HttpException('User does not exist!', 404); }
    }

    async updateUser(updateUser: UserDocument): Promise<UserDocument> {
        try {
            const updatedUser: UserDocument = await this.userModel.findByIdAndUpdate(updateUser._id, updateUser);
            return updatedUser;
        } catch { throw new HttpException('User does not exist!', 404); }
    }

    async deleteUser(id: objectid) {
        const result = await this.userModel.deleteOne({ _id: id }).exec();
        return result;
    }
}
