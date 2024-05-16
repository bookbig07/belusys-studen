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

    findAll(): Promise<classroom[]> {
        return this.classroomRepository.find();
    }

    async findbyId(id: number): Promise<classroom[]> {
        return this.classroomRepository.find({ where: { id } });
    }

    async findbyroomId(roomId: string): Promise<classroom[]> {
        return this.classroomRepository.find({ where: { roomNumber : roomId } });
    }

    async findbyroomName(roomName: string): Promise<classroom[]> {
        return this.classroomRepository.find({ where: { roomName : roomName } });
    }

    async findbyteacher(teacher: string): Promise<classroom[]> {
        return this.classroomRepository.find({ where: { homeroomTeacher : teacher } });
    }

    create(classroom : classroom): Promise<classroom> {
        return this.classroomRepository.save(classroom);
    }

    async remove(id: number): Promise<void> {
        await this.classroomRepository.delete(id);
    }

    async update(id: number, classroom: classroom): Promise<classroom[]> {
        await this.classroomRepository.update(id, classroom);
        return this.classroomRepository.find({ where: { id } });
    }
}