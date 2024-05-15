import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { studen } from '../studen/studen.entity';

@Entity()
export class room {
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
  
    @OneToMany(() => studen, (student) => student.classroom)
    students: studen[];
}
