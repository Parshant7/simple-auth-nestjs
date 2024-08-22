import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { userStatus } from "src/common/enums";

export class UpdateStatusDto{
    @ApiProperty({required: true})
    @IsString()
    userId: string;

    @ApiProperty({required: true, enum: userStatus, type:String, default: userStatus.deactivate})
    status: userStatus;
}


export class GetUserDto{
    @ApiProperty({required: false})
    @IsOptional()
    @IsString()
    userId: string;
}