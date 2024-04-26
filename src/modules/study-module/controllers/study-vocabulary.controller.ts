/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLessonVocabularyDTO } from '../dtos/create-lessons/createlessonvocabulary.dto';
import { VocabularyService } from '../services/vocabulary.service';

@Controller('/study/vocabulary-lesson')
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
    async practiceLessonVocabulary(@Param() params) {
        /**
         * Ôn tập bài học từ vựng
         */
    }

    @Get('study/:id')
    async studyLessonVocabulary(@Param() params)
    {
        /**
         * Học từ vựng mới như memrise
         */
    }
}
