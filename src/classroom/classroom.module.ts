import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { classroom } from './classroom.entity';
import { student } from '../student/student.entity';
import { classroomController } from './classroom.controller';
import { classroomService } from './classroom.service';

@Module({
    imports: [TypeOrmModule.forFeature([classroom, student])],
    controllers: [classroomController],
    providers: [classroomService],
})

export class ClassroomModule {}