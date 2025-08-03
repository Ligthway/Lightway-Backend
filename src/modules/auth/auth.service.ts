import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService} from "../user/user.service";
import { DatabaseService } from '../../database/database.service';
import { refreshTokens } from '../../database/schema';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import {LoginDto} from "../user/DTO/login-dto";


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private databaseService: DatabaseService,
    ){};
    async validateUser(email:string, password:string){
        const user= await this.userService.findByEmail(email);
        if(!user)
            return null;
        if(!user.isActive)
            throw new UnauthorizedException('Account is deactivated');
        const isPasswordValid=await this.userService.validatePassword(password, user.passwordHash);

        if(isPasswordValid){
            const {passwordHash, ...userWithoutPassword}=user;
            return userWithoutPassword;
        }
        return null;
    }
    async login(loginDto:LoginDto){
            const user=await this.userService.findByEmail(loginDto.email);
            await this.userService.updateLastLogin(user.id);

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        const accessToken=this.jwtService.sign(payload, {expiresIn: '15m'});
        const refreshToken=this.generateRefreshToken(user.id);

        return{
            access_token: accessToken,
            refresh_token: refreshToken,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
        };

    }
    async generateRefreshToken(userId:string){
        const token=uuidv4();
        const expiresAt=new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);//7 days
        await this.databaseService.database.insert(refreshTokens).values({
            userId, token, expiresAt
        });
        return token;
    }


    async refreshAccessToken(refreshToken: string) {
        const tokenRecord = await this.databaseService.database
            .select()
            .from(refreshTokens)
            .where(eq(refreshTokens.token, refreshToken))
            .limit(1);
        if (!tokenRecord[0] || tokenRecord[0].expiresAt < new Date()) {
            throw new UnauthorizedException('Invalid or expired refresh token');
        }


        const user = await this.userService.findById(tokenRecord[0].userId);
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        const accessToken = this.jwtService.sign(payload, { expiresIn: process.env.JWT_EXPIRATION });

        return {
            access_token: accessToken,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
        };
    }
    async logout(refreshToken: string) {
        await this.databaseService.database
            .delete(refreshTokens)
            .where(eq(refreshTokens.token, refreshToken));
    }
}
