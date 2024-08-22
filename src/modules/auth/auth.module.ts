import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
// import { IsEmailOrPhoneConstraint } from "./validators/index.validators";

@Module({
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule{};  