import { Controller, Post, Body, Response, HttpStatus, UseGuards, UsePipes, HttpCode } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { UsersService } from 'src/services/user.services';
import { AdminGuard } from 'src/common/guards/admin.guards';
import { User } from 'src/models/user.model';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ) {

    }

    @Post()
    @HttpCode(HttpStatus.OK)
    // @UseGuards(new AdminGuard())
    // @UsePipes(new ValidationPipe())
    async login(
        @Response() res: any,
        @Body() user: User,
    ) {
        if (!(user && user.email && user.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({
                message: 'Email and password are required!',
            });
        }

        const userOne = await this.userService.findOneByEmail(user.email);

        if (userOne) {
            if (await this.userService.compareHash(user.password, userOne.password)) {
                return res.status(HttpStatus.OK).json(
                    await this.authService.createJwtPayload(user));
            }
        }

        return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email or password wrong!' });

    }

    @Post('register')
    async registerUser(
        @Response() res: any,
        @Body() newUser: User,
    ) {
        if (!(newUser && newUser.email && newUser.password)) {
            return res.status(HttpStatus.FORBIDDEN).json({
                message: 'Username and password are required!',
            });
        }

        const user = await this.userService.findOneByEmail(newUser.email);

        if (user) {
           return res.status(HttpStatus.FORBIDDEN).json({ message: 'Email exists' });
        } else {
            const userSave = await this.userService.create(newUser);
            if (userSave) {
                newUser.password = undefined;
            }
            // await this.authService.createEmailToken(newUser.email);
            // await this.authService.saveUserConsent(newUser.email);
            const sent = await this.authService.sendEmail(newUser.email);
            if (sent) {
                return console.log("REGISTRATION.USER_REGISTERED_SUCCESSFULLY");
            } else {
                return console.log("REGISTRATION.ERROR.MAIL_NOT_SENT");
            }
        //    return res.status(HttpStatus.OK).json(userSave);
        }
    }
}
