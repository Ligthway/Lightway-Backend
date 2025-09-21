import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import {RolesGuard} from 'src/guards/roles.guard';
import {UseGuards} from '@nestjs/common';
import {Role} from '@common/decorators/roles.decorator';
import {Roles} from '@common/enums/roles.enum';
import {AssignAdminDto} from '@modules/locations/dto/assign-admin.dto';

@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post('create')
  @UseGuards(RolesGuard)
  @Role(Roles.OrganizationAdmin)
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Post('assign-admin')
  @UseGuards(RolesGuard)
  @Role(Roles.OrganizationAdmin)
  assignAdminToLocation(@Body() assignAdminDto: AssignAdminDto) {
    return this.locationsService.assignAdminToLocation(assignAdminDto.adminFirstName,
      assignAdminDto.adminLastName, assignAdminDto.locationName);
  }

  @Delete('remove-assignment')
  @UseGuards(RolesGuard)
  @Role(Roles.OrganizationAdmin)
  removeAdminFromLocation(@Body() assignAdminDto: AssignAdminDto) {
    return this.locationsService.deleteAssignment(assignAdminDto.adminFirstName,
      assignAdminDto.adminLastName, assignAdminDto.locationName);
  }
}
