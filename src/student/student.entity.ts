import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { classroom } from '../classroom/classroom.entity';

@Entity()
export class student {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    studentNumber: string;
  
    @Column()
    prefix: string;
  
    @Column()
    firstName: string;
  
    @Column()
    lastName: string;
  
    @Column()
    gender: string;
  
    @Column()
    birthDate: Date;
  
    @Column()
    grade: string;
  
    @ManyToOne(() => classroom, (classroom) => classroom.students)
    classroom: classroom;
}
