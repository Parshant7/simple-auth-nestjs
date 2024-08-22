import { Body, Controller, Get, Param, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserType } from "src/common/decorators/index.decorators";
import { userType } from "src/common/enums";
import { AuthGuard } from "src/common/guards/auth.guard";
import { AdminService } from "./admin.service";
import { GetUserDto, UpdateStatusDto } from "./dto/admin.dto";
import { IsOptional } from "class-validator";

@ApiTags("admin")
@UseGuards(AuthGuard)
@UserType(userType.admin)
@ApiBearerAuth('authentication')
@Controller("admin")
export class AdminController{
    constructor(
        private adminService: AdminService
    ){}

    async onApplicationBootstrap(){
        await this.adminService.createAdmin();
    }

    @Put("/update-user")
    async updateUser(@Body() dto: UpdateStatusDto){
        return await this.adminService.updateStatus(dto);
    }

    @Get("get-user")
    async getUsers(@Query() data: GetUserDto){
        return await this.adminService.getUsers(data.userId);
    }
}
