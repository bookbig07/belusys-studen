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
    findbyId(@Param('id') id: number): Promise<classroom> {
      return this.classroomService.findbyId(+id);
    }

    @Get('room/:roomNumber')
    findbyroomId(@Param('roomNumber') roomNumber: string): Promise<classroom[]> {
      return this.classroomService.findbyroomId(roomNumber);
    }
  
    @Get('roomName/:roomName')
    findbyroomName(@Param('roomName') roomName: string): Promise<classroom[]> {
      return this.classroomService.findbyroomName(roomName);
    }

    @Get('homeroomTeacher/:teacher')
    findbyteacher(@Param('teacher') teacher: string): Promise<classroom[]> {
      return this.classroomService.findbyteacher(teacher);
    }

    @Post()
    create(@Body() classroom: classroom): Promise<classroom> {
      return this.classroomService.create(classroom);
    }

    @Post('addInClass/:classroomId/:studentId')
    addStudentInClassroom(@Param('classroomId') classroomId: number, @Param('studentId') studentId: number) {
        return this.classroomService.addStudentInClassroom(classroomId, studentId);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() classroom: classroom): Promise<classroom[]> {
      return this.classroomService.update(id, classroom);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
      return this.classroomService.remove(+id);
    }

    @Delete('DelInClass/:classroomId/:studentId')
    removeStudentFromClassroom(@Param('classroomId') classroomId: number, @Param('studentId') studentId: number) {
        return this.classroomService.removeStudentFromClassroom(classroomId, studentId);
    }
}