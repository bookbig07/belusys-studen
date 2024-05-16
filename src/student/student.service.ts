import { Injectable , NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { student } from './student.entity';
import { createStudentInput } from './dto/student.input'

@Injectable()
export class studentService {
    constructor(
        @InjectRepository(student)
        private studentRepository: Repository<student>,
    ) {}

    findAll(): Promise<student[]> {
        return this.studentRepository.find();
    }

    async findbyId(id: number): Promise<student> {
        const foundStudent = await this.studentRepository.findOne({ where: { id } });
        if (!foundStudent) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }
        return foundStudent;
    }

    async findbystudentNumber(studentNumber: string): Promise<student> {
        const foundStudent = await this.studentRepository.findOne({ where: { studentNumber : studentNumber } });
        if (!foundStudent) {
            throw new NotFoundException(`Student with ID ${studentNumber} not found`);
        }
        return foundStudent;
    }

    create(students: createStudentInput): Promise<student> {
        return this.studentRepository.save(students);
    }

    async remove(id: number): Promise<void> {
        const result = await this.studentRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }
    }

    async update(id: number, students: student): Promise<student> {
        const foundStudent = await this.studentRepository.findOne({ where: { id } });
        if (!foundStudent) {
            throw new NotFoundException(`Student with ID ${id} not found`);
        }
        await this.studentRepository.update(id, students);
        return this.studentRepository.findOne({ where: { id } });
    }

    async findAdvanceSearch(students :  string): Promise<student[]> {
        return this.studentRepository.createQueryBuilder('student')
        .where('student.firstName LIKE :keyword', { keyword: `%${students}%` })
        .orWhere('student.lastName LIKE :keyword', { keyword: `%${students}%` })
        .orWhere('student.studentNumber LIKE :keyword', { keyword: `%${students}%` })
        .getMany();
    }

    async findByRoom(roomNumber: string): Promise<student[]> {
        const studentsInRoom = await this.studentRepository.find({
            where: { classroom: { roomNumber: roomNumber } },
            relations: ['classroom'],
        });
        if (!studentsInRoom || studentsInRoom.length === 0) {
            throw new NotFoundException(`No students found in classroom with room number ${roomNumber}`);
        }
        return studentsInRoom;
    }

    async findByGrade(grade: string): Promise<student[]> {
        const studentsInGrade = await this.studentRepository.find({
            where: { grade },
            relations: ['classroom'],
        });
        if (!studentsInGrade || studentsInGrade.length === 0) {
            throw new NotFoundException(`No students found in grade ${grade}`);
        }
        return studentsInGrade;
    }

    async findByAcademicYear(year: string): Promise<student[]> {
        const studentsInAcademicYear = await this.studentRepository.find({
            where: { classroom: { academicYear: year } },
            relations: ['classroom'],
        });
        if (!studentsInAcademicYear || studentsInAcademicYear.length === 0) {
            throw new NotFoundException(`No students found in academic year ${year}`);
        }
        return studentsInAcademicYear;
    }
}