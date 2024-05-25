/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/database/entities/course.entity';
import { Participant } from 'src/database/entities/participant.entity';
import { SetupLessonVocabularyController } from './controllers/setup-lesson-vocabulary.controller';
import { SetupParticipantController } from './controllers/setup-participant.controller';
import { SetupLessonVocabularyService } from './services/setup-lesson-vocabulary.service';
import { SetupParticipantService } from './services/setup-participant.service';
import { SetupParticipantRepository } from './repositories/setup-participant.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Course, Participant])],
    controllers: [SetupLessonVocabularyController,SetupParticipantController],
    providers: [SetupLessonVocabularyService,SetupParticipantService,SetupParticipantRepository],
})
export class SetupCourseModule {}
