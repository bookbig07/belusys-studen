import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { room } from '../classroom/room.entity';

@Entity()
export class studen {
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
  
    @ManyToOne(() => room, (classroom) => classroom.students)
    classroom: room;
}
