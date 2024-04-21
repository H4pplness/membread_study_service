/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entities/course.entity';
import { CourseRepository } from 'src/repositories/course.repository';
import { CourseController } from 'src/controllers/course.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Course])],
    controllers: [CourseController],
    providers: [CourseService,CourseRepository],
})
export class CourseServiceModule {}
