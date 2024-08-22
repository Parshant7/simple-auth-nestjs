import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import moment from "moment";
import { HydratedDocument, Types } from "mongoose";
import { emailOrPhone, otpType } from "src/common/enums/";

export type otpDocument = HydratedDocument<Otp>;

@Schema()
export class Otp {
    @Prop({type: String, required: true})
    code: string;

    @Prop({type: Types.ObjectId, required: true, ref: "users"})
    userId: string;

    @Prop({type: String, default: null})
    target: string;

    @Prop({enum: emailOrPhone, default: null})
    sentTo: emailOrPhone;

    @Prop({type: String, default: null})
    otpExpireAt: string;

    @Prop({type: Boolean, default: false})
    isVerified: boolean;

    @Prop({enum: otpType, required: true, default: otpType.emailVerify})
    otpType: otpType;

    @Prop({type: Number, required: true, default: null})
    createdAt: number;
}



export const otpSchema = SchemaFactory.createForClass(Otp);