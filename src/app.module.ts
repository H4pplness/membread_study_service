import { SetupCourseModule } from './modules/setup-course-module/setup-course.module';

import { StudyModule } from './modules/study-module/study.module';
import { ConfigModule } from './config/config.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonRepository } from './repositories/lesson.repository';
import { StudyController } from './controllers/study.controller';
import { Course } from './database/entities/course.entity';
import { Learning } from './database/entities/learning.entity';
import { Lesson } from './database/entities/lesson.entity';
import { Attribute } from './database/entities/attribute.entity';
import { LearningAttribute } from './database/entities/learning_attribute.entity';
import { CourseService } from './services/course-service/course.service';
import { StudyVocabularyService } from './services/study-service/study-vocabulary.service';
import { LessonService } from './services/lesson-service/lesson.service';
import { DataSource } from 'typeorm';
import { CourseProgress } from './database/entities/course_progress.entity';
import { Participant } from './database/entities/participant.entity';


@Module({
  imports: [
    SetupCourseModule,
    StudyModule,
    ConfigModule,
    TypeOrmModule.forFeature([Course, Learning, Lesson, Attribute, LearningAttribute, CourseProgress, Participant]),
  ],
  controllers: [
    AppController,
    StudyController
  ],
  providers: [AppService, LessonRepository, CourseService, StudyVocabularyService, LessonService],
})
export class AppModule { }
