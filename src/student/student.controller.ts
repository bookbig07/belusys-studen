import { Controller, Get, Post, Body, Param, Delete , Query } from '@nestjs/common';
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
    findbyId(@Param('id') id: string): Promise<student[]> {
      return this.studentService.findbyId(+id);
    }
  
    @Post()
    create(@Body() student: student): Promise<student> {
      return this.studentService.create(student);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.studentService.remove(+id);
    }

    @Get('search/:students')
    searchByKeyword(@Param('students') students: string): Promise<student[]> {
        return this.studentService.findAdvanceSearch(students);
    }
}