import { IsString, IsNotEmpty, IsNumber, MinLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignAdminDto {
  @ApiProperty({
    description: 'Name of the location to assign the admin to',
    example: 'Lidl Sofia West'
  })
  @IsString()
  @IsNotEmpty( { message: 'Location name cannot be empty.' })
  locationName: string;

  @ApiProperty({
    description: 'First name of the admin user',
    example: 'Alice'
  })
  @IsString()
  @IsNotEmpty( { message: 'Admin first name cannot be empty.' })
  adminFirstName: string;

  @ApiProperty({
    description: 'Last name of the admin user',
    example: 'Johnson'
  })
  @IsString()
  @IsNotEmpty( { message: 'Admin last name cannot be empty.' })
  adminLastName: string;
}
