import { PartialType } from '@nestjs/mapped-types';
import { CreateOrganizationDto } from './create-organization-module.dto';

export class UpdateOrganizationModuleDto extends PartialType(CreateOrganizationDto) {}
