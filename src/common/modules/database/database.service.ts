import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, userDocument } from "./models/user.model";
import { sessionDocument } from "./models/session.model";
import { otpDocument } from "./models/otp.model";
import { Model } from "mongoose";

@Injectable()
export class DatabaseService{
    constructor(
        @InjectModel('otps') public otp: Model<otpDocument>,
        @InjectModel('sessions') public session: Model<sessionDocument>,
        @InjectModel('users') public users: Model<userDocument>
    ){}
}
