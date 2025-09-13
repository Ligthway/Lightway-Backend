import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticatedGuard } from '@guards/authenticated.guard';
import { AuthModule } from '@modules/auth/auth.module';
import { DatabaseModule } from '@config/database.module';
import { LocalStorageModule } from '@config/local-storage.module';
import { OrganizationModule } from '@modules/organization-module/organization-module.module';

@Module({
  imports: [DatabaseModule, LocalStorageModule, AuthModule, OrganizationModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticatedGuard
    }
  ]
})
export class AppModule {}
