import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { student } from './student.entity';

@Injectable()
export class studenService {
    constructor(
        @InjectRepository(student)
        private studentRepository: Repository<student>,
    ) {}

    findAll(): Promise<student[]> {
        return this.studentRepository.find();
    }

    async findbyId(id: number): Promise<student[]> {
        return this.studentRepository.find({ where: { id } });
    }

    create(students: student): Promise<student> {
        return this.studentRepository.save(students);
    }

    async remove(id: number): Promise<void> {
        await this.studentRepository.delete(id);
    }

    async findAdvanceSearch(students :  string): Promise<student[]> {
        return this.studentRepository.createQueryBuilder('student')
        .where('student.firstName LIKE :keyword', { keyword: `%${students}%` })
        .orWhere('student.lastName LIKE :keyword', { keyword: `%${students}%` })
        .orWhere('student.studentNumber LIKE :keyword', { keyword: `%${students}%` })
        .getMany();
    }
}