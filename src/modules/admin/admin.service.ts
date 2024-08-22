import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/common/modules/database/database.service";
import { UpdateStatusDto } from "./dto/admin.dto";
import { customResponses } from "src/common/constants/response-message";
import * as moment from "moment";
import { userType } from "src/common/enums";

@Injectable()
export class AdminService{
    constructor(
        private db: DatabaseService,
    ){}

    async createAdmin(){
        const email = "parshant.khichi.henceforth@gmail.com";
        const password = "$2b$10$dGgPfaTroAJPeH7lW8.rxOSm/2nDizUEBMDdlIVLLnMciIuGv339m"
        const adminData = {
            username: 'admin',
            name: {
                firstName: 'Parshant'
            },
            email: email,
            countryCode: "+91",
            phoneNo: "9877065169",
            type: userType.admin,
            isEmailVerified: true,
            isPhoneVerfied: true,
            password: password,
            createdAt: moment().utc().valueOf()
        }
        const admin = await this.db.users.findOne({email: email}).lean();
        if(!admin){
            await this.db.users.create(adminData);
            return;
        }
        console.log("existing admin ",admin);
    }

    async updateStatus(data: UpdateStatusDto){
        const {userId, status} = data;
        const updatedUser = await this.db.users.findByIdAndUpdate(userId, {status: status}, {new: true}).lean();
        return {
            user: updatedUser,
            msg: customResponses.updateStatusSuccess
        }
    }

    async getUsers(userId: string){
        console.log(userId);
        
        if(userId){
            return await this.db.users.findById(userId).lean();
        }
        return await this.db.users.find().lean();
    }
}