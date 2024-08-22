import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsString, IsObject, IsOptional, Validate} from "class-validator";
import { 
    IsEmailOrPhone, IsEmailOrPhoneConstraint 
} from "../validators/index.validators";

class Name {
    @ApiProperty({default: "Parshant"})
    @IsString()
    firstName:String;

    @ApiProperty({default: "Khichi"})
    @IsString()
    lastName:String;
}

export class UserSignupDto {
    @ApiProperty({required: true})
    @IsObject()
    name: Name;
    
    @ApiProperty({required: true})
    @IsString()
    username: string;
    
    @ApiProperty({required: false})
    @IsEmail()
    email: string;

    @ApiProperty({default: "+91"})
    @IsString()
    @IsOptional()
    countryCode: string;

    @ApiProperty({default: "9877065169"})
    @IsOptional()
    @IsString()
    phoneNo: string;

    @ApiProperty({default: "abcd@1234"})
    @IsString()
    password: string;
}

export class UserLoginDto {
        
    @ApiProperty({required: true})
    @IsEmail()
    email: string;

    @ApiProperty({default: "abcd@1234"})
    @IsString()
    password: string;
}

export class ForgotPasswordDto {
    @ApiProperty({required: true})
    @IsEmail()
    email: string;
}

export class ResetPasswordDto {
    @ApiProperty({required: true})
    @IsEmail()
    email: string;

    @ApiProperty({required: true})
    @IsString()
    otp: string;

    @ApiProperty({required: true})
    @IsString()
    password: string;
}
