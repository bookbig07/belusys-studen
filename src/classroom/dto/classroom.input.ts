import { IsNotEmpty , IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createClassroomInput {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The room number of the classroom',
  })
  roomNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the classroom',
  })
  roomName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The academic year of the classroom',
  })
  academicYear: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The homeroom teacher of the classroom',
  })
  homeroomTeacher: string;
}
