import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { studenService } from './student.service';
import { student } from './student.entity';

@Controller('student')
export class studentController {
    constructor(
        private readonly studentService: studenService
    ) {}

    @Get()
    findAll(): Promise<student[]> {
      return this.studentService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<student> {
      return this.studentService.findOne(+id);
    }
  
    @Post()
    create(@Body() student: student): Promise<student> {
      return this.studentService.create(student);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.studentService.remove(+id);
    }
}