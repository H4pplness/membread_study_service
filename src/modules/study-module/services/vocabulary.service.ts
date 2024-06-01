/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { VocabularyRepository } from '../repositories/vocabulary.repository';
import { CreateLessonVocabularyDTO } from '../../../dtos/create-lessons/createlessonvocabulary.dto';
import { Lesson } from 'src/database/entities/lesson.entity';
import { GetLessonVocabularyDTO } from 'src/dtos/getlessonvocabulary.dto';
import { VocabularyDTO } from '../../../dtos/learnings/vocabulary.dto';
import { UpdateProgressLessonVocabularyDTO } from '../../../dtos/updare-progress-lesson/updateprogresslessonvocabulary.dto';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class VocabularyService {
    constructor(
        private readonly vocabularyRepository : VocabularyRepository,
        @Inject('ARCHIEVEMENT_SERVICE') private readonly archievementClient : ClientKafka
    ){}
    public async createLesson(createLesson : CreateLessonVocabularyDTO)
    {
        return await this.vocabularyRepository.createLesson(createLesson);
    }

    public async getLesson(lesson_id : number,userId : string)
    {
        const lesson = await Lesson.findOne({where : {id : lesson_id}});
        if(!lesson)
        {
            throw new NotFoundException()
        }
        /**
         * Nếu có thêm bài học khác ngoài từ vựng thì phải code thêm
         */ 
        const getLesson = new GetLessonVocabularyDTO();
        getLesson.title = lesson.title;
        getLesson.description = lesson.description;
        const learnings = await this.vocabularyRepository.getLesson(lesson_id,userId);

        const listVocabulary : VocabularyDTO[] = []
        
        learnings.forEach((item)=>{
            const voca_index = listVocabulary.findIndex((vocabulary)=>vocabulary.id === item.id)
            if(voca_index === -1){
                if(item.attribute == 'vocabulary'){
                    listVocabulary.push({
                        id : item.id,
                        vocabulary : item.value,
                        mean : '',
                        progress : item.progress
                    })
                }else{
                    listVocabulary.push({
                        id : item.id,
                        mean : item.value,
                        vocabulary : '',
                        progress : item.progress
                    })
                }
            }else{
                if(item.attribute == 'vocabulary'){
                    listVocabulary[voca_index]["vocabulary"] = item.value??''
                }else{
                    listVocabulary[voca_index]["mean"] = item.value??''
                }
            }
        })

        getLesson.listVocabulary = listVocabulary;

        return getLesson;
    }

    public async getStudyLesson(lesson_id : number,goal : number)
    {
        const lesson = await Lesson.findOne({where : {id : lesson_id}});
        /**
         * Nếu có thêm bài học khác ngoài từ vựng thì phải code thêm
         */ 
        const getLesson = new GetLessonVocabularyDTO();
        getLesson.title = lesson.title;
        getLesson.description = lesson.description;
        const learnings = await this.vocabularyRepository.getStudyLesson(lesson_id,goal);

        const listVocabulary : VocabularyDTO[] = []
        
        learnings.forEach((item)=>{
            const voca_index = listVocabulary.findIndex((vocabulary)=>vocabulary.id === item.id)
            if(voca_index === -1){
                if(item.attribute == 'vocabulary'){
                    listVocabulary.push({
                        id : item.id,
                        vocabulary : item.value,
                        mean : '',
                        progress : item.progress
                    })
                }else{
                    listVocabulary.push({
                        id : item.id,
                        mean : item.value,
                        vocabulary : '',
                        progress : item.progress
                    })
                }
            }else{
                if(item.attribute == 'vocabulary'){
                    listVocabulary[voca_index]["vocabulary"] = item.value??''
                }else{
                    listVocabulary[voca_index]["mean"] = item.value??''
                }
            }
        })

        getLesson.listVocabulary = listVocabulary;

        return getLesson;
    }

    public async getPracticeLesson(lesson_id : number,numberOfLearning : number)
    {
        const lesson = await Lesson.findOne({where : {id : lesson_id}});
        /**
         * Nếu có thêm bài học khác ngoài từ vựng thì phải code thêm
         */ 
        const getLesson = new GetLessonVocabularyDTO();
        getLesson.title = lesson.title;
        getLesson.description = lesson.description;
        const learnings = await this.vocabularyRepository.getPracticeLesson(lesson_id,numberOfLearning);

        const listVocabulary : VocabularyDTO[] = []
        
        learnings.forEach((item)=>{
            const voca_index = listVocabulary.findIndex((vocabulary)=>vocabulary.id === item.id)
            if(voca_index === -1){
                if(item.attribute == 'vocabulary'){
                    listVocabulary.push({
                        id : item.id,
                        vocabulary : item.value,
                        mean : '',
                        progress : item.progress
                    })
                }else{
                    listVocabulary.push({
                        id : item.id,
                        mean : item.value,
                        vocabulary : '',
                        progress : item.progress
                    })
                }
            }else{
                if(item.attribute == 'vocabulary'){
                    listVocabulary[voca_index]["vocabulary"] = item.value??''
                }else{
                    listVocabulary[voca_index]["mean"] = item.value??''
                }
            }
        })

        getLesson.listVocabulary = listVocabulary;

        return getLesson;
    }

    public async setStudyLesson(updateLesson : UpdateProgressLessonVocabularyDTO)
    {
        const firstLearningID = await this.vocabularyRepository.findOne({ where: { id: updateLesson.listVocabulary[0].learning_id }, relations: ["lesson","lesson.course"] });
        const currentLesson = firstLearningID.lesson;
        updateLesson.course_id = currentLesson.course.id;
        this.archievementClient.emit('updated.score',{courseId : updateLesson.course_id , score : updateLesson.score , userId : updateLesson.user_id})
        
        return await this.vocabularyRepository.updateStudyLesson(updateLesson);
    }
}
