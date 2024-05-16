import { Injectable , NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { classroom } from './classroom.entity';
import { student } from '../student/student.entity';
import { createClassroomInput } from './dto/classroom.input'

@Injectable()
export class classroomService {
    constructor(
        @InjectRepository(classroom)
        private classroomRepository: Repository<classroom>,
        @InjectRepository(student)
        private studentRepository: Repository<student>,
    ) {}

    findAll(): Promise<classroom[]> {
        return this.classroomRepository.find();
    }

    async findbyId(id: number): Promise<classroom> {
        const foundClassroom = await this.classroomRepository.findOne({ where: { id } });
        if (!foundClassroom) {
            throw new NotFoundException(`Classroom with ID ${id} not found`);
        }
        return foundClassroom;
    }

    async findbyroomId(roomNumber: string): Promise<classroom[]> {
        const foundClassrooms = await this.classroomRepository.find({ where: { roomNumber : roomNumber } });
        if (!foundClassrooms || foundClassrooms.length === 0) {
            throw new NotFoundException(`Classroom with room number ${roomNumber} not found`);
        }
        return foundClassrooms;
    }

    async findbyroomName(roomName: string): Promise<classroom[]> {
        const foundClassrooms = await this.classroomRepository.find({ where: { roomName : roomName } });
        if (!foundClassrooms || foundClassrooms.length === 0) {
            throw new NotFoundException(`Classroom with room name ${roomName} not found`);
        }
        return foundClassrooms;
    }

    async findbyteacher(teacher: string): Promise<classroom[]> {
        const foundClassrooms = await this.classroomRepository.find({ where: { homeroomTeacher : teacher } });
        if (!foundClassrooms || foundClassrooms.length === 0) {
            throw new NotFoundException(`Classroom with homeroom teacher ${teacher} not found`);
        }
        return foundClassrooms;
    }

    create(classroom : createClassroomInput): Promise<classroom> {
        return this.classroomRepository.save(classroom);
    }

    async remove(id: number): Promise<void> {
        const result = await this.classroomRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Classroom with ID ${id} not found`);
        }
    }

    async update(id: number, classroom: classroom): Promise<classroom[]> {
        const foundClassroom = await this.classroomRepository.findOne({ where: { id } });
        if (!foundClassroom) {
            throw new NotFoundException(`Classroom with ID ${id} not found`);
        }
        await this.classroomRepository.update(id, classroom);
        return this.classroomRepository.find({ where: { id } });
    }
    
    async addStudentInClassroom(classroomId: number, studentId: number): Promise<classroom> {
        const classroom = await this.classroomRepository.findOne({ 
            where: { id: classroomId }, 
            relations: ['students'] 
        });
        if (!classroom) {
            throw new NotFoundException(`Classroom with ID ${classroomId} not found`);
        }
        const student = await this.studentRepository.findOne({ where: { id : studentId } });
        if (!student) {
            throw new NotFoundException(`Student with ID ${studentId} not found`);
        }
        classroom.students = [...classroom.students, student];
        await this.classroomRepository.save(classroom);
        return classroom;
    }

    async removeStudentFromClassroom(classroomId: number, studentId: number) {
        const classroom = await this.classroomRepository.findOne({ 
            where: { id: classroomId }, 
            relations: ['students'] 
        });
        if (!classroom) {
            throw new NotFoundException(`Classroom with ID ${classroomId} not found`);
        }
        const studentIndex = classroom.students.findIndex(student => student.id == studentId);
        if (studentIndex == -1) {
            throw new NotFoundException(`Student with ID ${studentId} is not in classroom`);
        }
        classroom.students.splice(studentIndex, 1);
        await this.classroomRepository.save(classroom);
        return classroom;
    }
}