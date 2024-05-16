import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { student } from './student.entity';
import { studentController } from './student.controller';
import { studentService } from './student.service';

@Module({
    imports: [TypeOrmModule.forFeature([student])],
    controllers: [studentController],
    providers: [studentService],
})

export class StudentModule {}