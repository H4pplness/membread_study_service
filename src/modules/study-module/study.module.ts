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
import { StudyGrammarController } from './controllers/study-grammar.controller';
import { GrammarRepository } from './repositories/grammar.repository';
import { GrammarService } from './services/grammar.service';
import { UserServiceModule } from '../user-service-module/user_service.module';
import { StudyTestController } from './controllers/study-test.controller';
import { TestRepository } from './repositories/test.repository';
import { TestService } from './services/test.service';
import { RatingModule } from '../rating-module/rating.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Course, Learning, Lesson, Attribute, LearningAttribute, CourseProgress, Participant]),
        ArchievementModule,
        UserServiceModule,
        RatingModule
    ],
    controllers: [StudyVocabularyController,LessonController,StudyGrammarController,StudyTestController],
    providers: [VocabularyService,VocabularyRepository,LessonRepository,LessonService,ParticipantRepository,GrammarRepository,GrammarService,TestRepository,TestService],
})
export class StudyModule {}
