import { IsString, IsNotEmpty, IsNumber, MinLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({
    description: 'Name of the location',
    example: 'New York City'
  })
  @IsString()
  @IsNotEmpty( { message: 'Location name cannot be empty.' })
  name: string;


  @ApiProperty({
    description: 'Address of the location',
    example: '123 Main St, New York, NY 10001'
  })
  @IsString()
  @IsNotEmpty( { message: 'Address cannot be empty.' })
  address: string;


  @ApiProperty({
    description: 'Floor count of the location',
    example: '5'
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1, { message: 'Floor count must be at least 1.' })
  floorCount: number;

  @ApiProperty({
    description: 'Organization name associated with the location',
    example: 'BMW Bulgaristan'
  })
  @IsString()
  @IsNotEmpty({ message: 'Organization name cannot be empty.' })
  @MinLength(3, { message: 'Organization name must be at least 3 characters long.' })
  orgName: string;
}
