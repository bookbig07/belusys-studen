import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { classroom } from './classroom.entity';
import { classroomController } from './classroom.controller';
import { classroomService } from './classroom.service';

@Module({
    imports: [TypeOrmModule.forFeature([classroom])],
    controllers: [classroomController],
    providers: [classroomService],
})

export class ClassroomModule {}