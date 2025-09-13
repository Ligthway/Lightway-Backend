import { Module } from '@nestjs/common';
import { OrganizationModuleService } from './organization-module.service';
import { OrganizationModuleController } from './organization-module.controller';
import { RolesGuard } from '@guards/roles.guard';

@Module({
  controllers: [OrganizationModuleController],
  providers: [OrganizationModuleService, RolesGuard]
})
export class OrganizationModule {}
