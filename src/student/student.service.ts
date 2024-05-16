import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { student } from './student.entity';
import { classroom } from '../classroom/classroom.entity';

@Injectable()
export class studentService {
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

    async update(id: number, students: student): Promise<student[]> {
        await this.studentRepository.update(id, students);
        return this.studentRepository.find({ where: { id } });
    }

    async findAdvanceSearch(students :  string): Promise<student[]> {
        return this.studentRepository.createQueryBuilder('student')
        .where('student.firstName LIKE :keyword', { keyword: `%${students}%` })
        .orWhere('student.lastName LIKE :keyword', { keyword: `%${students}%` })
        .orWhere('student.studentNumber LIKE :keyword', { keyword: `%${students}%` })
        .getMany();
    }

    async findByRoom(roomId: string): Promise<student[]> {
        return this.studentRepository.find({ where: { classroom: { roomNumber : roomId } }, relations: ['classroom'] });
    }
    
    async findByGrade(grade: string): Promise<student[]> {
        return this.studentRepository.find({ where: { grade }, relations: ['classroom'] });
    }
    
    async findByAcademicYear(year: string): Promise<student[]> {
        return this.studentRepository.find({ where: { classroom : { academicYear : year} }, relations: ['classroom'] });
    }
}