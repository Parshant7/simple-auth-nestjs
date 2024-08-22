import {Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import {Types, HydratedDocument} from "mongoose";
import { sessionUserType, deviceType } from "src/common/enums";
import * as moment from "moment";

export type sessionDocument = HydratedDocument<Session>;

@Schema()
export class Session{
    @Prop({enum: sessionUserType, required: true})
    userType: sessionUserType;

    @Prop({type: Types.ObjectId, required: true, ref: "users"})
    userId: string;

    @Prop({enum: deviceType, required: true})
    device: deviceType;

    @Prop({type: String, required: true})
    fcmToken: string;

    @Prop({type: String, required: true})
    accessToken: string;

    @Prop({type: Number, required: true, default: moment().utc().valueOf()})
    createdAt: number;

    @Prop({type: Number, required: true, default: null})
    updatedAt: number;
}

export const sessionSchema = SchemaFactory.createForClass(Session);