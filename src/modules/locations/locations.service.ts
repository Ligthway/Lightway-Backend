import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { throwConflictException } from '@common/exceptions/conflict.exception';
import { CommonService } from '@common/services/common.service';
import { eq, and } from 'drizzle-orm';
import {OrganizationsService} from '@modules/organizations/organizations.service';
import {AuthService } from '@modules/auth/auth.service';
import { throwNotFound } from '@common/exceptions/not-found.exception';
import { locations } from '@schema/locations';
import { locationManagerAssignments } from '@schema/location-manager-assignments';

@Injectable()
export class LocationsService extends CommonService {
  constructor(private readonly organizationModuleService: OrganizationsService,
              private readonly authService: AuthService) {
    super();
  }
  async create(createLocationDto: CreateLocationDto) {
    try {
      const org= await this.organizationModuleService
        .findOne(createLocationDto.orgName);
      await this.db.insert(locations).values({
        name: createLocationDto.name,
        address: createLocationDto.address,
        floorCount: createLocationDto.floorCount,
        organizationId: org.id,
      });
    }
    catch (e) {
      if (e.code === '23505') {
        // Postgres unique violation
        if (e.constraint === 'locations_name_key') {
          throwConflictException('Location name already in use');
        }
        if (e.constraint === 'locations_address_key') {
          throwConflictException('Location address already in use');
        }
      }
      throw new InternalServerErrorException();
    }
  }

  async findByName(name: string) {
    const rows = await this.db
      .select()
      .from(locations)
      .where(eq(locations.name, name))
      .limit(1);
    if (rows.length === 0) {
      throwNotFound('Location not found');
    }
    return rows[0];
  }

  async assignAdminToLocation(firstName: string, lastName: string, locationName: string) {

    //loading org and user
    const loc= await this.findByName(locationName);
    const org=await this.organizationModuleService.findOne(loc.organizationId);
    const loc_admin= await this.authService.findUserByName(firstName, lastName);

    //permission checks
    if(this.userID!==org.adminId) {
      throwConflictException('Only the organization admin can assign a location admin');
    }
    if(org.id!==loc_admin.organizationId) {
      throwConflictException('The admin does not belong to the organization of the location');
    }

    //insert assignment
    try {
      await this.db.insert(locationManagerAssignments).values({
        userId: loc_admin.id,
        locationId: loc.id,
      });
    } catch (e: any) {
      if (e.code === '23505') {
        throwConflictException('Assignment already exists');
      }
      throw new InternalServerErrorException();
    }
  }


  async deleteAssignment(firstName: string, lastName: string, locationName: string) {

    //loading org and user
    const loc= await this.findByName(locationName);
    const org=await this.organizationModuleService.findOne(loc.organizationId);
    const loc_admin= await this.authService.findUserByName(firstName, lastName);

    //permission checks
    if(this.userID!==org.adminId) {
      throwConflictException('Only the organization admin can remove a location admin');
    }
    if(org.id!==loc_admin.organizationId) {
      throwConflictException('The admin does not belong to the organization of the location');
    }

    //delete assignment
    const deletedCount = await this.db
      .delete(locationManagerAssignments)
      .where(
        and(
          eq(locationManagerAssignments.userId, loc_admin.id),
          eq(locationManagerAssignments.locationId, loc.id),
        ),
      )
      .execute();

    if (deletedCount.rowCount === 0) {//rowCount is the number of affected (deleted) rows
      throwNotFound('Assignment not found');
    }
  }
}
