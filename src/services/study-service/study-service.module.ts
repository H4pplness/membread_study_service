/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { StudyVocabularyService } from './study-vocabulary.service';

@Module({
    imports: [],
    controllers: [],
    providers: [StudyVocabularyService],
})
export class StudyServiceModule {}
