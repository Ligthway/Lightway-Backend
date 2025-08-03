import {IsEmail, IsString, MinLength} from 'class-validator'
export class CreateUserDto {
    //email
    @IsEmail()
    email: string;


    //password of at least 6 characters
    @IsString()
    @MinLength(6)
    password:string;

    @IsString()
    role:string;


    @IsString()
    firstName:string;

    @IsString()
    lastName:string;
}