import { Controller, Get, Post, Body, Param, Delete , Put } from '@nestjs/common';
import { classroomService } from './classroom.service';
import { classroom } from './classroom.entity';
import { ApiTags, ApiOperation, ApiResponse , ApiParam , ApiBody } from '@nestjs/swagger';
import { createClassroomInput } from './dto/classroom.input'

@Controller('classroom')
@ApiTags('classroom')
export class classroomController {
    constructor(
        private readonly classroomService: classroomService
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get all classrooms' })
    @ApiResponse({ status: 200, description: 'Return all classrooms' })
    findAll(): Promise<classroom[]> {
      return this.classroomService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a classroom by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the classroom', type: 'number' })
    @ApiResponse({ status: 200, description: 'Return a classroom by ID' })
    @ApiResponse({ status: 404, description: 'Classroom not found' })
    findbyId(@Param('id') id: number): Promise<classroom> {
      return this.classroomService.findbyId(+id);
    }

    @Get('room/:roomNumber')
    @ApiOperation({ summary: 'Get classrooms by room number' })
    @ApiParam({ name: 'roomNumber', description: 'The room number', type: 'string' })
    @ApiResponse({ status: 200, description: 'Return classrooms by room number' })
    findbyroomId(@Param('roomNumber') roomNumber: string): Promise<classroom[]> {
      return this.classroomService.findbyroomId(roomNumber);
    }
  
    @Get('roomName/:roomName')
    @ApiOperation({ summary: 'Get classrooms by room name' })
    @ApiParam({ name: 'roomName', description: 'The room name', type: 'string' })
    @ApiResponse({ status: 200, description: 'Return classrooms by room name' })
    findbyroomName(@Param('roomName') roomName: string): Promise<classroom[]> {
      return this.classroomService.findbyroomName(roomName);
    }

    @Get('homeroomTeacher/:teacher')
    @ApiOperation({ summary: 'Get classrooms by homeroom teacher' })
    @ApiParam({ name: 'teacher', description: 'The homeroom teacher', type: 'string' })
    @ApiResponse({ status: 200, description: 'Return classrooms by homeroom teacher' })
    findbyteacher(@Param('teacher') teacher: string): Promise<classroom[]> {
      return this.classroomService.findbyteacher(teacher);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new classroom' })
    @ApiResponse({ status: 201, description: 'The classroom has been successfully created' })
    @ApiParam({ name: 'roomNumber', description: 'The room number of the classroom', type: 'string' })
    @ApiParam({ name: 'roomName', description: 'The name of the classroom', type: 'string' })
    @ApiParam({ name: 'academicYear', description: 'The academic year of the classroom', type: 'string' })
    @ApiParam({ name: 'homeroomTeacher', description: 'The homeroom teacher of the classroom', type: 'string' })
    @ApiBody({ type: [createClassroomInput] })
    create(@Body() classroom: createClassroomInput): Promise<classroom> {
      return this.classroomService.create(classroom);
    }

    @Post('addInClass/:classroomId/:studentId')
    @ApiOperation({ summary: 'Add a student to a classroom' })
    @ApiParam({ name: 'classroomId', description: 'The ID of the classroom', type: 'number' })
    @ApiParam({ name: 'studentId', description: 'The ID of the student', type: 'number' })
    @ApiResponse({ status: 200, description: 'Successfully added student to classroom' })
    @ApiResponse({ status: 404, description: 'Classroom or student not found' })
    addStudentInClassroom(@Param('classroomId') classroomId: number, @Param('studentId') studentId: number) {
        return this.classroomService.addStudentInClassroom(classroomId, studentId);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a classroom by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the classroom', type: 'number' })
    @ApiResponse({ status: 200, description: 'Successfully updated classroom' })
    @ApiResponse({ status: 404, description: 'Classroom not found' })
    async update(@Param('id') id: number, @Body() classroom: classroom): Promise<classroom[]> {
      return this.classroomService.update(id, classroom);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Delete a classroom by ID' })
    @ApiParam({ name: 'id', description: 'The ID of the classroom', type: 'number' })
    @ApiResponse({ status: 200, description: 'Successfully deleted classroom' })
    @ApiResponse({ status: 404, description: 'Classroom not found' })
    remove(@Param('id') id: string): Promise<void> {
      return this.classroomService.remove(+id);
    }

    @Delete('DelInClass/:classroomId/:studentId')
    @ApiOperation({ summary: 'Remove a student from a classroom' })
    @ApiParam({ name: 'classroomId', description: 'The ID of the classroom', type: 'number' })
    @ApiParam({ name: 'studentId', description: 'The ID of the student', type: 'number' })
    @ApiResponse({ status: 200, description: 'Successfully removed student from classroom' })
    @ApiResponse({ status: 404, description: 'Classroom or student not found' })
    removeStudentFromClassroom(@Param('classroomId') classroomId: number, @Param('studentId') studentId: number) {
        return this.classroomService.removeStudentFromClassroom(classroomId, studentId);
    }
}