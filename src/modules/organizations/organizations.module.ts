import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';
import { RolesGuard } from '@guards/roles.guard';

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService, RolesGuard],
  exports: [OrganizationsService],
})
export class OrganizationModule {}
