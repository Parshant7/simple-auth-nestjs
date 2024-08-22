import { Injectable } from "@nestjs/common";
import {registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";
import { customResponses } from "src/common/constants/response-message";

@ValidatorConstraint({ async: false, name: 'customText'})
export class IsEmailOrPhoneConstraint implements ValidatorConstraintInterface {
    validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> | boolean {
        console.log("value ", value);
        const [relatedPropertyName] = validationArguments.constraints;
        const relatedValue = (validationArguments.object as any)[relatedPropertyName];
        console.log("relatedValue ", relatedValue);
        return value!=null || relatedValue!=null;
    }
    defaultMessage(): string {
        return customResponses.EmailOrPhoneNotProvider;
    }
}

export function IsEmailOrPhone(property: string, validationOptions?: ValidationOptions){
    console.log("property ",property);
    return (object: Object, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsEmailOrPhoneConstraint
        })
    }
}

// import { Injectable } from '@nestjs/common';
// import {
//   ValidationOptions,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
//   registerDecorator,
// } from 'class-validator';

// @ValidatorConstraint({ async: true })
// @Injectable()
// export class AllowedEmailValidator implements ValidatorConstraintInterface {
//   constructor() {}

//   async validate(value: string): Promise<boolean> {
//     try {
//       const blackLists = [
//         'bad.attitude@email.com',
//         'not.allowed@email.com',
//         'competitor@email.com',
//       ];
//       if (blackLists.includes(value)) return false;
//       return true;
//     } catch (e) {
//       return false;
//     }
//   }

//   defaultMessage(): string {
//     return 'Email not allowed';
//   }
// }

// export const IsAllowedEmail = (validationOptions?: ValidationOptions) => {
//     return (object: unknown, propertyName: string) => {
//       registerDecorator({
//         target: object.constructor,
//         propertyName: propertyName,
//         options: validationOptions,
//         validator: AllowedEmailValidator,
//       });
//     };
//   };

// @ValidatorConstraint()
// export class phoneWithCodeConstraint implements ValidatorConstraintInterface {
//     validate(validationArguments?: ValidationArguments): Promise<boolean> | boolean {
//         const [relatedPropertyName] = validationArguments.constraints;
//         const relatedValue = (validationArguments.object as any)[relatedPropertyName];
//         const phoneNo = (validationArguments.object as any)[relatedPropertyName];
//         return value!=null || relatedValue!=null;
//     }
//     defaultMessage(): string {
//         return customResponses.EmailOrPhoneNotProvider;
//     }
// }

// export function phoneWithCode(property: string, validationOptions?: ValidationOptions){
//     return (object: Object, propertyName: string) => {
//         registerDecorator({
//             target: object.constructor,
//             propertyName: propertyName,
//             options: validationOptions,
//             constraints: [property],
//             validator: IsEmailOrPhoneConstraint
//         })
//     }
// }