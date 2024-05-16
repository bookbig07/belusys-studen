import { Module } from '@nestjs/common';
import { StudentModule } from './student/student.module';
import { ClassroomModule } from './classroom/classroom.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'belusys_studen',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    StudentModule,
    ClassroomModule
  ],
})
export class AppModule {}
