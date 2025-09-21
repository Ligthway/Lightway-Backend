import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsController } from './locations.controller';
import { AuthModule } from '@modules/auth/auth.module';
import { OrganizationModule } from '@modules/organizations/organizations.module';
import { RolesGuard } from 'src/guards/roles.guard';

@Module({
  imports: [AuthModule, OrganizationModule],
  controllers: [LocationsController],
  providers: [LocationsService, RolesGuard],
})
export class LocationsModule {}
