import { Injectable } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization-module.dto';
import { UpdateOrganizationModuleDto } from './dto/update-organization-module.dto';
import { CommonService } from '@common/services/common.service';
import { throwConflictException } from '@common/exceptions/conflict.exception';
import { organizations } from '@schema/organizations';
import { InternalServerErrorException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { throwNotFound } from '@common/exceptions/not-found.exception';

@Injectable()
export class OrganizationModuleService extends CommonService {
  constructor() {
    super();
  }

  async create(createDto: CreateOrganizationDto) {
    try {
      await this.db.insert(organizations).values({
        name: createDto.name,
        adminId: this.userID
      });
    } catch (e) {
      if (e.code === '23505') {
        throwConflictException('Name already in use');
      }
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all organizationModule`;
  }

  async findOne(name: string) {
    const rows = await this.db
      .select()
      .from(organizations)
      .where(eq(organizations.name, name))
      .limit(1);
    if (rows.length === 0) {
      throwNotFound('Organization not found');
    }
    return rows[0];
  }

  update(id: number, updateOrganizationModuleDto: UpdateOrganizationModuleDto) {
    return `This action updates a #${id} organizationModule`;
  }

  remove(id: number) {
    return `This action removes a #${id} organizationModule`;
  }
}
