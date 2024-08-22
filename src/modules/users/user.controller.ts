import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserLogin, UserSignup } from "./dto/login.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { DatabaseService } from "src/common/modules/database/database.service";

@ApiTags('users')
@Controller("users")
export class UserController{
    constructor(
        private userService: UserService,
        private model: DatabaseService
    ){}

    @ApiOperation({summary: "Creates new user"})
    @Post('/signup')
    async signup(@Body() payload: UserSignup) {
        return await this.userService.signupUser(payload);
    }
}
