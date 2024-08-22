import { BadRequestException, Injectable } from "@nestjs/common";
import { DatabaseService } from "src/common/modules/database/database.service";
import { ForgotPasswordDto, ResetPasswordDto, UserLoginDto, UserSignupDto } from "./dto/auth.dto";
import { hashSync, genSaltSync, compareSync} from "bcrypt";
import { customResponses } from '../../common/constants/response-message';
import { CommonService, OtpService } from "src/common/modules/common/common.service";
import { otpType, tokenType, userType } from "src/common/enums";
import * as moment from "moment";
import { userIdentifier } from "src/common/interfaces/user.interface";
import { config } from "dotenv";
import { userDocument } from "src/common/modules/database/models/user.model";
config();

@Injectable()
export class AuthService{
    constructor(
        private db: DatabaseService,
        private commonService: CommonService,
        private otpService: OtpService
    ){}

    signupUser = async (data: UserSignupDto)=> {
        console.log(data);
        if(!data.email && !(data.countryCode && data.phoneNo)){
            throw new BadRequestException(customResponses.EmailOrPhoneNotProvider);
        }
        await this.checkUserExists(data);
        const password = await this.encryptPassword(data.password);
        const newUser = await this.db.users.create({...data, password});
        console.log(newUser);
        return newUser;
    }

    loginUser = async (data: UserLoginDto)=>{
        console.log("this is data ", data);
        const userDetail = await this.commonService.getUserDetails(data);
        if(!userDetail) throw new BadRequestException(customResponses.EmailNotExists);
        console.log(userDetail);
        const isValid = compareSync(data.password, userDetail?.password);
        console.log(isValid);
        if(!isValid) throw new BadRequestException(customResponses.IncorrectPassword);;

        const tokenPayload = {
            _id: userDetail._id,
            tokenType: tokenType.authToken,
            tokenGenAt: moment().utc().valueOf(),
            userType: userDetail.type            
        };
        const token = this.commonService.signToken(tokenPayload, tokenType.authToken);

        const sessionPayload = {
            userType: userDetail.type,
            userId: userDetail._id,
            device: data.device,
            fcmToken: data.fcmToken,
            accessToken: token,
            createdAt: moment().utc().valueOf(),
            updatedAt: moment().utc().valueOf()
        }

        await this.db.session.create(sessionPayload);

        return {token};
    }

    forgetPassword = async (data: ForgotPasswordDto)=>{
        console.log(data);
        const {email} = data;
        const user: any = await this.db.users.findOne({email: email}).lean();
        if(!user) throw new BadRequestException(customResponses.EmailNotExists);
        
        console.log(user);
        //send otp to email
        const randomOtp = this.commonService.generateOTP();
        await this.otpService.sendForgotPassEmailOtp(user, randomOtp);
        return {msg: customResponses.OtpSentSuccess};
    }

    resetPassword = async (data: ResetPasswordDto)=>{
        console.log("/reset password", data);
        const otpDoc = await this.db.otp.findOne({code: data?.otp, otpType: otpType.forgotPassword,target: data.email, isVerified: false});
        if(!otpDoc){
            throw new BadRequestException(customResponses.InvalidOtp)
        }
        const now = moment().utc().valueOf().toString();
        if(otpDoc.otpExpireAt>now){
            throw new BadRequestException(customResponses.ExpiredOtp)
        }
        otpDoc.isVerified = true;
        otpDoc.save();
        const password = await this.encryptPassword(data.password);
        await this.db.users.findByIdAndUpdate(otpDoc.userId,{password: password});
        return {msg: customResponses.PasswordResetSuccess};
    }

    logout = async (data: userDocument, token: string)=>{
        const payload = {
            _id: data._id
        };
        const logoutToken = this.commonService.signToken(payload, tokenType.logoutToken);
        //delete from session
        await this.db.session.findOneAndDelete({token: token});
        return logoutToken;
    }

    checkUserExists = async (data: UserSignupDto)=>{
        let userDetails = null;
        if(data.email){
            userDetails = await this.db.users.findOne({email: data.email});
            if (userDetails) throw new BadRequestException(customResponses.EmailAlreadyExists);
        }
        else if(data.phoneNo){
            userDetails = await this.db.users.findOne({phoneNo: data.phoneNo, countryCode: data.countryCode});
            if (userDetails) throw new BadRequestException(customResponses.PhoneAlreadyExists);
        }
    }

    encryptPassword = async (password: string)=>{
        const salt = genSaltSync(Number(process.env.SALT_ROUND) || 10);
        const encryptPassword = hashSync(password, salt);
        return encryptPassword;
    }

    decryptPassword = async (password: string, hash: string) => {
        return compareSync(password, hash);
    }

    // checkContacts = async (data: userIdentifier)=>{
    //     if(!data.email && !(data.countryCode && data.phoneNo)){
    //         throw new BadRequestException(customResponses.EmailOrPhoneNotProvider);
    //     }
    //     return false;
    // }

}
