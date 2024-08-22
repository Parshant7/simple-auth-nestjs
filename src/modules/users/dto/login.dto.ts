import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsString, IsObject} from "class-validator";

class Name {
    @ApiProperty({default: "Parshant"})
    @IsString()
    firstName:String;

    @ApiProperty({default: "Khichi"})
    @IsString()
    lastName:String;
}

export class UserSignup {
    @ApiProperty({required: true})
    @IsObject()
    name: Name;

    @ApiProperty({required: true})
    @IsObject()
    username: Name;

    @ApiProperty({required: true})
    @IsEmail()
    email: String;

    @ApiProperty({default: "+91"})
    @IsString()
    countryCode: String;

    @ApiProperty({default: "9877065169"})
    @IsString()
    phoneNo: String;

    @ApiProperty({default: "abcd@1234"})
    @IsString()
    password: String;
}

export class UserLogin {
        
    @ApiProperty({required: true})
    @IsEmail()
    email: String;

    @ApiProperty({default: "abcd@1234"})
    @IsString()
    password: String;
}