import { Controller, Get, Post, Body, Param, Delete , Query } from '@nestjs/common';
import { classroomService } from './classroom.service';
import { classroom } from './classroom.entity';

@Controller('student')
export class studentController {
    constructor(
        private readonly studentService: classroomService
    ) {}

}