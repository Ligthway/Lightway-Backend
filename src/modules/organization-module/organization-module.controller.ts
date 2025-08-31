import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrganizationModuleService } from './organization-module.service';
import { CreateOrganizationDto } from './dto/create-organization-module.dto';
import { Role } from '@common/decorators/roles.decorator';
import { Roles } from '@common/enums/roles.enum';
import { RolesGuard } from '@guards/roles.guard';

@Controller('organization-module')
export class OrganizationModuleController {
  constructor(
    private readonly organizationModuleService: OrganizationModuleService
  ) {}

  @Post('create')
  @UseGuards(RolesGuard)
  @Role(Roles.OrganizationAdmin)
  create(@Body() createOrganizationModuleDto: CreateOrganizationDto) {
    return this.organizationModuleService.create(createOrganizationModuleDto);
  }
}
