/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CourseRepository } from './course.repository';
import { LearningRepository } from './learning.repository';
import { LessonRepository } from './lesson.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entities/course.entity';
import { Learning } from 'src/entities/learning.entity';
import { Lesson } from 'src/entities/lesson.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Course,Learning,Lesson])],
    controllers: [],
    providers: [CourseRepository,LearningRepository,LessonRepository],
})
export class RepositoriesModule { }
