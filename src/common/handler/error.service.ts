import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
    constructor(message: string) {
        super(message, HttpStatus.BAD_REQUEST);
    }
}

export class EmailExist extends HttpException {
    constructor() {
        super("This email is already in use. Please use different mail", HttpStatus.BAD_REQUEST);
    }
}

export class EmailNotExist extends HttpException {
    constructor() {
        super("This email is not registered with us.", HttpStatus.BAD_REQUEST);
    }
}

export class EmailNotFound extends HttpException {
    constructor() {
        super('Sorry email not found in your social login!.', HttpStatus.BAD_REQUEST);
    }
}

export class PhoneNumberExist extends HttpException {
    constructor() {
        super("Phone Number entered is already registered with NFTwist.", HttpStatus.BAD_REQUEST);
    }
}

export class PhoneNumberNotExist extends HttpException {
    constructor() {
        super('Sorry this phone number does not exists', HttpStatus.BAD_REQUEST);
    }
}

export class NotBearerToken extends HttpException {
    constructor() {
        super('Sorry this is not a bearer token', HttpStatus.BAD_REQUEST);
    }
}

export class OnlyPartnerCanPerform extends HttpException {
    constructor() {
        super('Sorry Only Partner can Perform this Action', HttpStatus.BAD_REQUEST);
    }
}

export class Unauthorized extends HttpException {
    constructor() {
        super('You are not authorized to perform this action.', HttpStatus.UNAUTHORIZED);
    }
}

export class InsufficientPermission extends HttpException {
    constructor() {
        super('insufficient permission', HttpStatus.BAD_REQUEST);
    }
}

export class InvalidObjectId extends HttpException {
    constructor() {
        super('Sorry this is not a valid object id.', HttpStatus.BAD_REQUEST);
    }
}

export class IncorrectMessageId extends HttpException {
    constructor() {
        super('Sorry this is not a valid message _id.', HttpStatus.BAD_REQUEST);
    }
}

export class WrongOtp extends HttpException {
    constructor() {
        super('The OTP entered is incorrect! Please enter correct OTP.', HttpStatus.BAD_REQUEST);
    }
}


export class UserNotMatched extends HttpException {
    constructor() {
        super('Sorry users does not matched.', HttpStatus.BAD_REQUEST);
    }
}

export class AdminNotFound extends HttpException {
    constructor() {
        super('Sorry admin not found.', HttpStatus.BAD_REQUEST);
    }
}

export class UserNotFound extends HttpException {
    constructor() {
        super('Sorry user not found.', HttpStatus.BAD_REQUEST);
    }
}

export class NoUserFound extends HttpException {
    constructor() {
        super('Sorry user not found with these credentials.', HttpStatus.BAD_REQUEST);
    }
}

export class EmailAlreadyExist extends HttpException {
    constructor() {
        super('Sorry this email already exist.', HttpStatus.BAD_REQUEST);
    }
}

export class SessionrNotFound extends HttpException {
    constructor() {
        super('Sorry session not found.', HttpStatus.BAD_REQUEST);
    }
}

export class WrongPassword extends HttpException {
    constructor() {
        super("The Password entered is incorrect! Please enter correct Password.", HttpStatus.BAD_REQUEST);
    }
}

export class OldPasswordIncorrect extends HttpException {
    constructor() {
        super("Old Password is Incorrect!.", HttpStatus.BAD_REQUEST);
    }
}

export class UseDifferentPassword extends HttpException {
    constructor() {
        super("This password is used previously. Please try with new combinations!.", HttpStatus.BAD_REQUEST);
    }
}
export class AccountBlocked extends HttpException {
    constructor() {
        super('Your account is temporarily Blocked. Please contact us via Support.', HttpStatus.BAD_REQUEST);
    }
}

export class AccountDeleted extends HttpException {
    constructor() {
        super('User not found with these credentials.', HttpStatus.BAD_REQUEST);
    }
}


export class DataNotFound extends HttpException {
    constructor() {
        super('Sorry Data Not Found.', HttpStatus.NOT_ACCEPTABLE);
    }
}

export class CollectionNotFound extends HttpException {
    constructor() {
        super('Collection not found.', HttpStatus.NOT_FOUND);
    }
}

export class YouAreNotOwner extends HttpException {
    constructor() {
        super('You are not the owner of this nft.', HttpStatus.NOT_FOUND);
    }
}

export class NftOwnerNotFound extends HttpException {
    constructor() {
        super('You are not the owner of this nft.', HttpStatus.NOT_FOUND);
    }
}

export class NftNotFound extends HttpException {
    constructor() {
        super('Sorry No Nft Found.', HttpStatus.NOT_FOUND);
    }
}

export class CommentNotFound extends HttpException {
    constructor() {
        super('Sorry No Comment Found.', HttpStatus.NOT_FOUND);
    }
}

export class PartnerRequestPending extends HttpException {
    constructor() {
        super('Sorry Your Partner request not accepted yet.', HttpStatus.NOT_ACCEPTABLE);
    }
}

export class PartnerRequestAlreadySent extends HttpException {
    constructor() {
        super('Partner Request Already Sent.', HttpStatus.NOT_ACCEPTABLE);
    }
}

export class PartnerRequestRejected extends HttpException {
    constructor() {
        super('Sorry your partner request rejected.', HttpStatus.NOT_ACCEPTABLE);
    }
}

export class PartnerNotFound extends HttpException {
    constructor() {
        super('sory partner request not found.', HttpStatus.NOT_ACCEPTABLE);
    }
}

export class NoPartner extends HttpException {
    constructor() {
        super('partner not found', HttpStatus.NOT_ACCEPTABLE);
    }
}


export class ReportNotFound extends HttpException {
    constructor() {
        super('report not found.', HttpStatus.NOT_ACCEPTABLE);
    }
}

export class YouAlreadySubscribed extends HttpException {
    constructor() {
        super('You are already Subscribed for Updates.', HttpStatus.NOT_ACCEPTABLE);
    }
}


export class SupportNotFound extends HttpException {
    constructor() {
        super('support not found', HttpStatus.NOT_FOUND);
    }
}

export class InvalidParameter extends HttpException {
    constructor() {
        super('Sorry Invalid parameters', HttpStatus.NOT_ACCEPTABLE);
    }
}

export class IncompleteParameter extends HttpException {
    constructor() {
        super('Verification require both  front and back side of Id card..', HttpStatus.NOT_ACCEPTABLE);
    }
}

export class AlreadyPartner extends HttpException {
    constructor() {
        super('user already partner', HttpStatus.BAD_REQUEST);
    }
}

export class PartnerAlreadyExist extends HttpException {
    constructor() {
        super('partner already Exist with this email.', HttpStatus.BAD_REQUEST);
    }
}

export class OnlyPartnerCanAdd extends HttpException {
    constructor() {
        super('Only partner can add rule.', HttpStatus.BAD_REQUEST);
    }
}

export class OnlyAdd10Rules extends HttpException {
    constructor() {
        super('you can add only 10 rules.', HttpStatus.BAD_REQUEST);
    }
}

export class RuleAlreadyAdded extends HttpException {
    constructor() {
        super('you already added a rule for this nft.', HttpStatus.BAD_REQUEST);
    }
}

export class RuleNotFound extends HttpException {
    constructor() {
        super('Rule Not Found.', HttpStatus.NOT_FOUND);
    }
}

export class YouAreNotCreaterOfThisRule extends HttpException {
    constructor() {
        super('You are not the creater of this rule.', HttpStatus.BAD_REQUEST);
    }
}

export class NotCreater extends HttpException {
    constructor() {
        super('you are not creator of this nft.', HttpStatus.BAD_REQUEST);
    }
}

export class UserAlreadyExist extends HttpException {
    constructor() {
        super('user already Exist with this email.', HttpStatus.BAD_REQUEST);
    }
}
export class UseNormalLogin extends HttpException {
    constructor() {
        super("This email is used as Normal Login. Please login using Email and Password.", HttpStatus.NOT_ACCEPTABLE);
    }
}


export class UserNameAlreadyExist extends HttpException {
    constructor() {
        super("User exists with this Username, Please try with another combination.", HttpStatus.BAD_REQUEST);
    }
}


export class LoginWithSame extends HttpException {
    constructor() {
        super('Please login with this account to send partner request', HttpStatus.BAD_REQUEST);
    }
}

export class followThyself extends HttpException {
    constructor() {
        super('You can not follow yoursef', HttpStatus.BAD_REQUEST);
    }
}

export class GiftingLimitExceeds extends HttpException {
    constructor() {
        super('Your Gifting Limit Exceeds!.', HttpStatus.BAD_REQUEST);
    }
}

export class NoCommunity extends HttpException {
    constructor() {
        super("There's no community member yet!.", HttpStatus.BAD_REQUEST);
    }
}

export class ProvideContractAddress extends HttpException {
    constructor() {
        super(`Please provide collections's contract address`, HttpStatus.BAD_REQUEST);
    }
}

export class AccountTempBlocked extends HttpException {
    constructor() {
        super('Oops! Your account is temporarily Blocked.', HttpStatus.FORBIDDEN);
    }
}

export class InvalidPhoneNumber extends HttpException {
    constructor() {
        super('Invalid Phone Number.', HttpStatus.FORBIDDEN);
    }
}

export class MaxAttemptReached extends HttpException {
    constructor() {
        super('You have reached the maximum number of attempts to enter the OTP. Please try after few Hours..', HttpStatus.FORBIDDEN);
    }
}

export class InvalidOtp extends HttpException {
    constructor() {
        super('OTP entered is incorrect. Please enter correct OTP.', HttpStatus.BAD_REQUEST);
    }
}

export class AccountDeactivated extends HttpException {
    constructor() {
        super('Account Deactivated.', HttpStatus.BAD_REQUEST);
    }
}

export class FeatureNewsNotFound extends HttpException {
    constructor() {
        super('feature_news not found.', HttpStatus.BAD_REQUEST);
    }
}

export class ProvideEmailOrPhoneNumber extends HttpException {
    constructor() {
        super('Please Provide Email or Phone number for forgot password', HttpStatus.BAD_REQUEST);
    }
}

export class VerifyChangePassword extends HttpException {
    constructor() {
        super('Please Provide Email or Phone number to verify otp', HttpStatus.BAD_REQUEST);
    }
}

export class ChangePasswordOtp extends HttpException {
    constructor() {
        super('Please provide otp for password change', HttpStatus.BAD_REQUEST);
    }
}



export class NftAlreadyReported extends HttpException {
    constructor() {
        super('You have already reported this nft', HttpStatus.BAD_REQUEST);
    }
}

export class OnlyPartnerCanMakeNft extends HttpException {
    constructor() {
        super('Sorry Only Partner can create nfts', HttpStatus.BAD_REQUEST);
    }
}

export class OnlyPartnerCanGift extends HttpException {
    constructor() {
        super('Sorry Only Partner can gift nfts', HttpStatus.BAD_REQUEST);
    }
}

export class OnlyPartnerCanExport extends HttpException {
    constructor() {
        super('Sorry Only Partner can export gift history', HttpStatus.BAD_REQUEST);
    }
}

export class UseSocialLogin extends HttpException {
    constructor() {
        super('This account is used for Social Login.', HttpStatus.BAD_REQUEST);
    }
}

export class RegisterYourself extends HttpException {
    constructor() {
        super('Please Signup before login with this this account.', HttpStatus.BAD_REQUEST);
    }
}

export class NoRewardFound extends HttpException {
    constructor() {
        super('No coupon found for redeem.', HttpStatus.BAD_REQUEST);
    }
}