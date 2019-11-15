import { Controller, Post, Body, Response, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { UserDocument } from 'src/documents/user.document';
import { UsersService } from 'src/services/user.services';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ) {

    }

    @Post()
    async login(
        @Response() res: any,
        @Body() user: UserDocument,
    ) {
        console.log('auth controller ok');

        if (!(user && user.email && user.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({
                message: 'Email and password are required!',
            });
        }

        const userOne = await this.userService.findOneByEmail(user.email);

        // const logUser = await this.authService.validateUserByPassword(user);
        if (userOne) {
            if (await this.userService.compareHash(user.password, userOne.password)) {
                return res.status(HttpStatus.OK).json(
                    await this.authService.createJwtPayload(user.email));
            }
        }

        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email or password wrong!' });

    }

    @Post('register')
    async registerUser(
        @Response() res: any,
        @Body() body: UserDocument,
        ) {
        if (!(body && body.email && body.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({
                message: 'Username and password are required!',
             });
        }

        const user = await this.userService.findOneByEmail(body.email);

        if (user) {
            return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email exists' });
        } else {
            const userSave = await this.userService.create(body);
            if (userSave) {
                body.password = undefined;
            }
            return res.status(HttpStatus.OK).json(userSave);
        }
    }
}
