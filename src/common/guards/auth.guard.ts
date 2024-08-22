import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { EmailExist, Unauthorized } from "../handler/error.service";
import { CommonService } from "../modules/common/common.service";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC_KEY, TYPES_KEY } from "../decorators/index.decorators";
import { userType } from "../enums";


@Injectable()
export class AuthGuard implements CanActivate{
  constructor(
    private reflector: Reflector,
    private commonService: CommonService,
    private jwtService: JwtService
  ){}
  async canActivate(context: ExecutionContext): Promise<boolean>{
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if(isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    console.log(token);
    if(!token){
      throw new Unauthorized();
    }

    const decodedToken = this.jwtService.verify(token);
    console.log("decoded Token ", decodedToken);

    const userDetail = await this.commonService.getUserDetails(decodedToken);
    if(!userDetail) throw new Unauthorized();

    request.user = userDetail;
    
    const requiredTypes = this.reflector.getAllAndOverride<userType[]>(TYPES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    console.log(requiredTypes);
    
    if(!requiredTypes) return true;

    if(requiredTypes.includes(userDetail.type))
      return true;
    else
      throw new Unauthorized();    
  }

  extractTokenFromHeader(request: Request): string|undefined{
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}