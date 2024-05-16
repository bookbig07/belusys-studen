import { Controller, Get, Post, Body, Param, Delete , Put } from '@nestjs/common';
import { studentService } from './student.service';
import { student } from './student.entity';

@Controller('student')
export class studentController {
    constructor(
        private readonly studentService: studentService
    ) {}

    @Get()
    findAll(): Promise<student[]> {
      return this.studentService.findAll();
    }
  
    @Get(':id')
    findbyId(@Param('id') id: number): Promise<student> {
      return this.studentService.findbyId(+id);
    }

    @Get('studentNumber/:studentNumber')
    findbystudentNumber(@Param('studentNumber') studentNumber: string): Promise<student> {
      return this.studentService.findbystudentNumber(studentNumber);
    }

    @Get('room/:roomNumber')
    findByRoom(@Param('roomNumber') roomNumber: string): Promise<student[]> {
        return this.studentService.findByRoom(roomNumber);
    }

    @Get('grade/:grade')
    findByGrade(@Param('grade') grade: string): Promise<student[]> {
        return this.studentService.findByGrade(grade);
    }

    @Get('academicYear/:year')
    findByAcademicYear(@Param('year') year: string): Promise<student[]> {
        return this.studentService.findByAcademicYear(year);
    }

    @Get('search/:students')
    searchByKeyword(@Param('students') students: string): Promise<student[]> {
      return this.studentService.findAdvanceSearch(students);
    }
  
    @Post()
    create(@Body() student: student): Promise<student> {
      return this.studentService.create(student);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() student: student): Promise<student> {
      return this.studentService.update(id, student);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.studentService.remove(+id);
    }
}