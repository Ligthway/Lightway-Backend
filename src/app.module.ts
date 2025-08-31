import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticatedGuard } from '@guards/authenticated.guard';
import { AuthModule } from '@modules/auth/auth.module';
import { DatabaseModule } from '@config/database.module';
import { LocalStorageModule } from '@config/local-storage.module';
import { OrganizationModuleModule } from './organization-module/organization-module.module';
import { OrganizationsModuleModule } from './src/modules/organizations-module/organizations-module.module';
import { OrganizationModuleModule } from './organization-module/organization-module.module';
import { OrganizationsModuleModule } from './src/modules/organizations-module/organizations-module.module';
import { OrganizationsModuleModule } from './src/modules/organizations-module/organizations-module.module';

@Module({
  imports: [DatabaseModule, LocalStorageModule, AuthModule, OrganizationModuleModule, OrganizationsModuleModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticatedGuard
    }
  ]
})
export class AppModule {}
