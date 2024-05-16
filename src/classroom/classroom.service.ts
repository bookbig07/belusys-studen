import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { classroom } from './classroom.entity';

@Injectable()
export class classroomService {
    constructor(
        @InjectRepository(classroom)
        private classroomRepository: Repository<classroom>,
    ) {}
}