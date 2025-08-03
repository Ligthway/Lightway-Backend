import { Controller, Post, Body, UseGuards, Get, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto} from "../user/DTO/login-dto";
import { RefreshTokenDto} from "../user/DTO/RefreshTokenDto";
import { JwtAuthGuard} from "./Guards/jwt-auth/jwt-auth.guard";

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const user=await this.authService.validateUser(loginDto.email, loginDto.password);
        if(!user) {
            throw new UnauthorizedException('Invalid email or password');
        }
        return this.authService.login(loginDto);
    }



    @Post('refresh')
    async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshAccessToken(refreshTokenDto.token);
    }



    @Post('logout')
    async logout(@Body() refreshTokenDto: RefreshTokenDto) {
        await this.authService.logout(refreshTokenDto.token);
        return { message: 'Logged out successfully' };
    }
}
