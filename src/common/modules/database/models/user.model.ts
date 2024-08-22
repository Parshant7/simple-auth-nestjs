import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import * as moment from "moment";
import { userStatus } from "src/common/enums";
import { userType } from "src/common/enums/db-related.enum";

export type userDocument = HydratedDocument<User>;

@Schema()
class Name{
    @Prop({ type: String, required: true})
    firstName: string;

    @Prop({ type: String, default: null})
    lastName: string;
}

@Schema()
export class User{

    @Prop({ type: String, required: true})
    username: string;

    @Prop({ type: Object, required: true})
    name: Name;

    @Prop({ type: String, default: null})
    email: string;
    
    @Prop({ type: String, default: null})
    countryCode: string;
    
    @Prop({ type: String, default: null})
    phoneNo: string;
    
    @Prop({ type: Boolean, default: false})
    isEmailVerfied: boolean;
    
    @Prop({ type: Boolean, default: false})
    isPhoneVerfied: boolean;
    
    @Prop({ type: String, required: true})
    password: string;

    @Prop({ enum: userStatus, default: userStatus.activated })
    status: userStatus;

    @Prop({ enum: userType, default: userType.user, required: true })
    type: userType;

    @Prop({ type: Number, default: moment().utc().valueOf()})
    createdAt: number;
    
    @Prop({ type: Number, default: 0})
    updatedAt: number;
}

export const userSchema = SchemaFactory.createForClass(User);

