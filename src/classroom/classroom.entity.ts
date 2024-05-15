import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { student } from '../student/student.entity';

@Entity()
export class classroom {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    roomNumber: string;
  
    @Column()
    roomName: string;
  
    @Column()
    academicYear: string;
  
    @Column()
    homeroomTeacher: string;
  
    @OneToMany(() => student, (student) => student.classroom)
    students: student[];
}
