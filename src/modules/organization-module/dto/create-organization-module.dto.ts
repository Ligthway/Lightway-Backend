import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationDto {
  @ApiProperty({
    description: 'Name of the organization cannot be empty and must be at least 3 characters long.',
    example: 'Tech Innovators',
    minLength: 3
  })
  @IsString()
  @IsNotEmpty({ message: 'Organization name cannot be empty.' })
  @MinLength(3, { message: 'Organization name must be at least 3 characters long.' })
  name: string;
}