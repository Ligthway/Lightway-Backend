import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import {RolesGuard} from '@guards/roles.guard';
import {OrganizationModule} from '@modules/organizations/organizations.module';
import {OrganizationsService} from '@modules/organizations/organizations.service';
import envConfig from '../../../env.config';

@Module({
  imports: [
    JwtModule.register({
      secret: envConfig.JWT_SECRET
    }),
    OrganizationModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}
