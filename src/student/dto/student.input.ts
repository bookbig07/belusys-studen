import { IsString, IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class createStudentInput {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The student number',
  })
  studentNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The prefix of the student',
  })
  prefix: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The first name of the student',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The last name of the student',
  })
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The gender of the student',
  })
  gender: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The birth date of the student',
  })
  birthDate: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The grade of the student',
  })
  grade: string;
}
