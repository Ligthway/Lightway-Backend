import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization-module.dto';
import { UpdateOrganizationModuleDto } from './dto/update-organization-module.dto';
import { CommonService } from '@common/services/common.service';
import { throwConflictException } from '@common/exceptions/conflict.exception';
import { organizations } from '@schema/organizations';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class OrganizationModuleService extends CommonService {
  constructor() {
    super();
  }

  async create(createDto: CreateOrganizationDto) {
    try {
      await this.db.insert(organizations).values({
        name: createDto.name
      });
    } catch (e) {
      if (e.code === '23505') {
        throwConflictException('Email already in use');
      }
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all organizationModule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organizationModule`;
  }

  update(id: number, updateOrganizationModuleDto: UpdateOrganizationModuleDto) {
    return `This action updates a #${id} organizationModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationModule`;
  }
}
