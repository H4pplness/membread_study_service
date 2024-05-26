/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLessonVocabularyDTO } from '../../../dtos/create-lessons/createlessonvocabulary.dto';
import { VocabularyService } from '../services/vocabulary.service';
import { UpdateProgressLessonVocabularyDTO } from '../../../dtos/updare-progress-lesson/updateprogresslessonvocabulary.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller('')
export class StudyVocabularyController {
    constructor(
        private readonly vocabularyService: VocabularyService
    ) { }
    
    /**
     * 
     * @param data 
     * @returns tạo mới 1 bài học từ vựng 
     */
    @MessagePattern('create-lesson-vocabulary')
    async createLessonVocabulary(data : {createLessonVocabulary: CreateLessonVocabularyDTO  }) {
        try{
            const result = await this.vocabularyService.createLesson(data.createLessonVocabulary);
            return "Create lesson success !";
        }catch(error){
            return error;
        }
    }

    /**
     *  @param params id
     *  Lấy 1 bài học từ vựng
     */
    @MessagePattern('get-lesson-vocabulary')
    async getLessonVocabulary(data : {lessonId : number,userId : string}) {
        try{
            const result = await this.vocabularyService.getLesson(data.lessonId,data.userId);
            console.log("RESULT : ",result);
            return JSON.stringify(result);
        }catch(error){
            return error;
        }
    }

    /**
     * Ôn tập bài học từ vựng
     * @param params id
     * Lấy những học phần cần được ôn tập 
     */
    @MessagePattern('review-vocabulary-lesson')
    async reviewLessonVocabulary(data : {lessonId : number,numberOfLearning : number}) {
        return await JSON.stringify(this.vocabularyService.getPracticeLesson(data.lessonId,data.numberOfLearning));
    }

    /**
     * 
     * @param params 
     * @param body 
     * @returns Lấy những học phần để học mới 
     */
    @MessagePattern('study-vocabulary-lesson')
    async studyLessonVocabulary(@Param() params,@Body() body: {goal : number})
    {
        return await this.vocabularyService.getStudyLesson(params.id,body.goal);
    }

    /**
     * 
     * @param data 
     * @returns Cập nhật tiến độ học tập của khóa học từ vựng 
     */
    @MessagePattern('update-progress-vocabulary-lesson')
    async updateProgressStudy(data : {updateProgress : UpdateProgressLessonVocabularyDTO})
    {
        // console.log("SCORE : ",data.updateProgress.score);
        return await this.vocabularyService.setStudyLesson(data.updateProgress);
    }
}
