import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';
import { Public } from '@common/decorators/public.decorator';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { RegisterDto } from '@modules/auth/dto/register.dto';
import { AuthService } from '@modules/auth/auth.service';
import { RolesGuard } from '@guards/roles.guard';
import { Roles } from '@common/enums/roles.enum';
import { Role } from '@common/decorators/roles.decorator';
import { LocManDto } from '@modules/auth/dto/loc-man.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto, @Req() req: Request & { user: any }) {
    return req.user;
  }

  @Post('register')
  @Public()
  register(@Body() registerDto: RegisterDto) {
    return this.authService.registerOrgAdmin(registerDto);
  }

  @Post('register-location-manager')
  @UseGuards(RolesGuard)
  @Role(Roles.OrganizationAdmin)
  registerLocationManager(@Body() locManDto: LocManDto) {
    return this.authService.registerLocManager(locManDto);
  }
}

//de adaugat admin prost care poate fi facut de admin boss