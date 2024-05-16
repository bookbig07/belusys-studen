import { Controller, Get, Post, Body, Param, Delete , Put } from '@nestjs/common';
import { studentService } from './student.service';
import { student } from './student.entity';
import { ApiTags, ApiOperation, ApiResponse , ApiParam , ApiBody } from '@nestjs/swagger';
import { createStudentInput } from './dto/student.input'

@Controller('student')
@ApiTags('students')
export class studentController {
    constructor(
        private readonly studentService: studentService
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get all students' })
    @ApiResponse({ status: 200, description: 'Return all students' }) 
    findAll(): Promise<student[]> {
      return this.studentService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a student by ID' })
    @ApiParam({ name: 'id', description: 'Student ID' })
    findbyId(@Param('id') id: number): Promise<student> {
      return this.studentService.findbyId(+id);
    }

    @Get('studentNumber/:studentNumber')
    @ApiOperation({ summary: 'Get a student by student number' })
    @ApiParam({ name: 'studentNumber', description: 'Student number' })
    findbystudentNumber(@Param('studentNumber') studentNumber: string): Promise<student> {
      return this.studentService.findbystudentNumber(studentNumber);
    }

    @Get('room/:roomNumber')
    @ApiOperation({ summary: 'Get students by room number' })
    @ApiParam({ name: 'roomNumber', description: 'Room number' })
    findByRoom(@Param('roomNumber') roomNumber: string): Promise<student[]> {
        return this.studentService.findByRoom(roomNumber);
    }

    @Get('grade/:grade')
    @ApiOperation({ summary: 'Get students by grade' })
    @ApiParam({ name: 'grade', description: 'Grade' })
    findByGrade(@Param('grade') grade: string): Promise<student[]> {
        return this.studentService.findByGrade(grade);
    }

    @Get('academicYear/:year')
    @ApiOperation({ summary: 'Get students by academic year' })
    @ApiParam({ name: 'year', description: 'Academic year' })
    findByAcademicYear(@Param('year') year: string): Promise<student[]> {
        return this.studentService.findByAcademicYear(year);
    }

    @Get('search/:students')    
    @ApiOperation({ summary: 'Search students by keyword' })
    @ApiParam({ name: 'students', description: 'Keyword for searching students firstName , lastName , studentNumber' })
    searchByKeyword(@Param('students') students: string): Promise<student[]> {
      return this.studentService.findAdvanceSearch(students);
    }
  
    @Post()
    @ApiOperation({ summary: 'Create a new student' })
    @ApiResponse({ status: 201, description: 'The student has been successfully created' })
    @ApiParam({ name: 'studentNumber', description: 'The student number', type: 'string' })
    @ApiParam({ name: 'prefix', description: 'The prefix of the student', type: 'string' })
    @ApiParam({ name: 'firstName', description: 'The first name of the student', type: 'string' })
    @ApiParam({ name: 'lastName', description: 'The last name of the student', type: 'string' })
    @ApiParam({ name: 'gender', description: 'The gender of the student', type: 'string' })
    @ApiParam({ name: 'birthDate', description: 'The birth date of the student', type: 'Date' })
    @ApiParam({ name: 'grade', description: 'The grade of the student', type: 'string' })
    @ApiBody({ type: createStudentInput })
    create(@Body() student: createStudentInput): Promise<student> {
      return this.studentService.create(student);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a student by ID' })
    @ApiParam({ name: 'id', description: 'Student ID' })
    @ApiResponse({ status: 200, description: 'Successfully updated Student' })
    @ApiResponse({ status: 404, description: 'Student not found' })
    async update(@Param('id') id: number, @Body() student: student): Promise<student> {
      return this.studentService.update(id, student);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a student by ID' })
    @ApiParam({ name: 'id', description: 'Student ID' })
    @ApiResponse({ status: 200, description: 'Successfully updated Student' })
    @ApiResponse({ status: 404, description: 'Student not found' })
    remove(@Param('id') id: string): Promise<void> {
      return this.studentService.remove(+id);
    }
}