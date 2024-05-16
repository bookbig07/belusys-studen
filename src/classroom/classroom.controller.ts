import { Controller, Get, Post, Body, Param, Delete , Put } from '@nestjs/common';
import { classroomService } from './classroom.service';
import { classroom } from './classroom.entity';

@Controller('classroom')
export class classroomController {
    constructor(
        private readonly classroomService: classroomService
    ) {}
    @Get()
    findAll(): Promise<classroom[]> {
      return this.classroomService.findAll();
    }
  
    @Get(':id')
    findbyId(@Param('id') id: string): Promise<classroom[]> {
      return this.classroomService.findbyId(+id);
    }
  
    @Post()
    create(@Body() classroom: classroom): Promise<classroom> {
      return this.classroomService.create(classroom);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.classroomService.remove(+id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() classroom: classroom): Promise<classroom[]> {
      return this.classroomService.update(id, classroom);
    }
}