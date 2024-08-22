import { BadRequestException, Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { emailOrPhone, otpType, tokenType } from "src/common/enums";
import { JwtService } from "@nestjs/jwt";
import { otpValidityTime, tokenExpiryTime } from "src/common/constants/values";
import { userIdentifier } from "src/common/interfaces/user.interface";
import { MailerService } from "@nestjs-modules/mailer";
import * as moment from "moment";
import { customResponses } from "src/common/constants/response-message";

@Injectable()
export class CommonService{
    constructor(
        private db: DatabaseService,
        private jwtService: JwtService,
    ){}

    getUserDetails = async (data: userIdentifier)=>{
        console.log(data.email);
        if(data._id)
            return await this.db.users.findById(data._id).lean()

        else if(data.email)
            return await this.db.users.findOne({email: data.email}).lean()

        else if(data.phoneNo)
            return await this.db.users.findOne({phoneNo: data.phoneNo, countryCode: data.countryCode}).lean()

        return null;
    }
    
    signToken(payload: any, type?:tokenType) {
        let expireIn = tokenExpiryTime.authToken;
        
        switch(type){
          case tokenType.resetPasswordToken:
            expireIn = tokenExpiryTime.resetPasswordToken;
            break;
    
          case tokenType.logoutToken:
            expireIn = tokenExpiryTime.logoutToken;
            break;
        }
    
        const token = this.jwtService.sign(payload, {
          expiresIn: expireIn,
        });

        return token;
    }

    decryptToken(token: string){
        const payload = this.jwtService.decode(token)
    }

    generateOTP(length: number = 4){
        const min = Math.pow(10, length);
        const max = 9*min;
        const otp = Math.floor(min+Math.random()*max);
        return otp.toString();
    }
}

@Injectable()
export class OtpService{
    constructor(
        private db: DatabaseService,
        private jwtService: JwtService,
        private mailerService: MailerService
    ){}

    sendForgotPassEmailOtp = async (userData: userIdentifier, otp: string)=>{
        try {
            await this.mailerService.sendMail({
                to: userData.email,
                subject: `Verify Otp`,
                text: otp,
                html: `<br>${otp}<br>`
            })
            const otpExpiry = moment().utc().add(otpValidityTime.forgotPassEmail, "m").valueOf();

            const query = {
                userId: userData._id,
                sentTo: emailOrPhone.email,
                otpType: otpType.forgotPassword,
            }
            const update = {
                code: otp,
                target: userData.email,
                otpExpireAt: otpExpiry,
                isVerified: false,
                createdAt: moment().utc().valueOf()
            }
            await this.db.otp.findOneAndUpdate(query,update,{upsert: true});
        } catch (error) {
            console.log("error sending otp ", error);
            throw new BadRequestException(customResponses.OtpSentErr);
        }
    }

    getUserDetails = async (data: userIdentifier)=>{
        console.log(data.email);
        let query:any = {};
        if(data._id)
            return await this.db.users.findById(data._id).lean()

        else if(data.email)
            return await this.db.users.findOne(query).lean()

        else if(data.phoneNo)
            return await this.db.users.findOne({phoneNo: data.phoneNo, countryCode: data.countryCode}).lean()

        return null;
    }
    
    signToken(payload: any, type?:tokenType) {
        let expireIn = tokenExpiryTime.authToken;
    
        switch(type){
          case tokenType.resetPasswordToken:
            expireIn = tokenExpiryTime.resetPasswordToken;
            break;
    
          case tokenType.logoutToken:
            expireIn = tokenExpiryTime.logoutToken;
            break;
        }
    
        const token = this.jwtService.sign(payload, {
          expiresIn: expireIn,
        });
    
        return token;
    }

    decryptToken(token: string){
        const payload = this.jwtService.decode(token)
    }
}