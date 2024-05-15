import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { student } from './student.entity';
import { studentController } from './student.controller';
import { studenService } from './student.service';

@Module({
    imports: [TypeOrmModule.forFeature([student])],
    controllers: [studentController],
    providers: [studenService],
})

export class StudentModule {}