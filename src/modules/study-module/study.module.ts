/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { StudyVocabularyController } from './controllers/study-vocabulary.controller';
import { VocabularyService } from './services/vocabulary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/database/entities/course.entity';
import { Learning } from 'src/database/entities/learning.entity';
import { Lesson } from 'src/database/entities/lesson.entity';
import { Attribute } from 'src/database/entities/attribute.entity';
import { LearningAttribute } from 'src/database/entities/learning_attribute.entity';
import { CourseProgress } from 'src/database/entities/course_progress.entity';
import { Participant } from 'src/database/entities/participant.entity';
import { VocabularyRepository } from './repositories/vocabulary.repository';
import { ArchievementModule } from '../archievement-module/archievement.module';
import { LessonController } from './controllers/lesson.controller';
import { LessonService } from './services/lesson.service';
import { LessonRepository } from './repositories/lesson.repository';
import { ParticipantRepository } from './repositories/participant.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Course, Learning, Lesson, Attribute, LearningAttribute, CourseProgress, Participant]),
        ArchievementModule
    ],
    controllers: [StudyVocabularyController,LessonController],
    providers: [VocabularyService,VocabularyRepository,LessonRepository,LessonService,ParticipantRepository],
})
export class StudyModule {}
