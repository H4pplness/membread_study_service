/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLessonVocabularyDTO } from '../dtos/create-lessons/createlessonvocabulary.dto';
import { VocabularyService } from '../services/vocabulary.service';
import { UpdateProgressLessonVocabularyDTO } from '../dtos/updare-progress-lesson/updateprogresslessonvocabulary.dto';

@Controller('/lesson/vocabulary-lesson')
export class StudyVocabularyController {
    constructor(
        private readonly vocabularyService: VocabularyService
    ) { }
    @Post('')
    async createLessonVocabulary(@Body() createLessonVocabulary: CreateLessonVocabularyDTO) {
        return this.vocabularyService.createLesson(createLessonVocabulary);
    }

    /**
     * Lấy bài học từ vựng
     * @param params id
     */
    @Get(':id')
    async getLessonVocabulary(@Param() params) {
        return await this.vocabularyService.getLesson(params.id)
    }

    /**
     * Ôn tập bài học từ vựng
     * @param params id
     */
    @Get('practice/:id')
    async practiceLessonVocabulary(@Param() params,@Body() body : {numberOfLearning : number}) {
        return await this.vocabularyService.getPracticeLesson(params.id,body.numberOfLearning);
    }

    @Get('study/:id')
    async studyLessonVocabulary(@Param() params,@Body() body: {goal : number})
    {
        return await this.vocabularyService.getStudyLesson(params.id,body.goal);
    }

    @Post('update')
    async updateProgressStudy(@Body() updateProgress : UpdateProgressLessonVocabularyDTO)
    {
        console.log("SCORE : ",updateProgress.score);
        return await this.vocabularyService.setStudyLesson(updateProgress);
    }
}
