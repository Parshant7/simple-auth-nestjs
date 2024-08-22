import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/common/modules/database/database.service";

@Injectable()
export class UserService{
    constructor(
        private readonly db: DatabaseService,
    ){}

    signupUser = async (data: any)=> {
        //check if email exists
        const userDetails = await this.getUserDetail(data);
        if(userDetails) {
            console.log("user already exists");
            return 
        }
    }

    getUserDetail = async (data: any)=>{
        let userDetails = null;
        if(data.email){
            userDetails = await this.db.users.findOne({email: data.email});
        }
        else if(data.phoneNo){
            userDetails = await this.db.users.findOne({phoneNo: data.phoneNo, countryCode: data.countryCode});
        }
        return userDetails;
    }
}