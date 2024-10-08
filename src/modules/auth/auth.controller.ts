import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { DatabaseService } from "src/common/modules/database/database.service";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ForgotPasswordDto, ResetPasswordDto, UserLoginDto, UserSignupDto } from "./dto/auth.dto";
import { Request } from "express";
import { AuthGuard } from "src/common/guards/auth.guard";
import { Public, Token, User, UserType } from "src/common/decorators/index.decorators";
import { userType } from "src/common/enums";
import { userDocument } from "src/common/modules/database/models/user.model";

@ApiTags('auth')
@ApiBearerAuth('authentication')
@UseGuards(AuthGuard)
@UserType(userType.admin, userType.user)
@Controller("auth")
export class AuthController{
    constructor(
        private readonly authService: AuthService,
        private readonly db: DatabaseService
    ){}

    @ApiOperation({summary: "Creates new user"})
    @Public()
    @Post('/signup')
    async signup(@Body() payload: UserSignupDto) {
        return await this.authService.signupUser(payload);
    }

    @ApiOperation({summary: "login user/admin"})
    @Public()
    @Post('/login')
    async login(@Body() body: UserLoginDto) {
        return await this.authService.loginUser(body);
    }

    @ApiOperation({summary: "forgot Password"})
    @Public()
    @Post('/forgot-password')
    async forgotPassword(@Body() body: ForgotPasswordDto) {
        return await this.authService.forgetPassword(body);
    }

    @ApiOperation({summary: "Reset Password"})
    @Public()
    @Post('/reset-password')
    async resetPassword(@Body() body: ResetPasswordDto) {
        return await this.authService.resetPassword(body);
    }

    @ApiOperation({summary: "Logout"})
    @Post('/logout')
    async logout(@User() user: userDocument, @Token() token: string) {
        return await this.authService.logout(user, token);
    }

    @ApiOperation({summary: "temp"})
    @Post('/temp')
    async temp(@Req() req: Request) {
        console.log(req.user);
        return {
            det: req.user
        };
    }
}
