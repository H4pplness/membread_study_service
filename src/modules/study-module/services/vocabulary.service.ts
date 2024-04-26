/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { VocabularyRepository } from '../repositories/vocabulary.repository';
import { CreateLessonDTO } from '../dtos/create-lessons/createlesson.dto';
import { CreateLessonVocabularyDTO } from '../dtos/create-lessons/createlessonvocabulary.dto';
import { Lesson } from 'src/database/entities/lesson.entity';
import { GetLessonVocabularyDTO } from 'src/dtos/getlessonvocabulary.dto';
import { VocabularyDTO } from '../dtos/learnings/vocabulary.dto';

@Injectable()
export class VocabularyService {
    constructor(
        private readonly vocabularyRepository : VocabularyRepository
    ){}
    public async createLesson(createLesson : CreateLessonVocabularyDTO)
    {
        return await this.vocabularyRepository.createLesson(createLesson);
    }

    public async getLesson(lesson_id : number)
    {
        const lesson = await Lesson.findOne({where : {id : lesson_id}});
        /**
         * Nếu có thêm bài học khác ngoài từ vựng thì phải code thêm
         */ 
        const getLesson = new GetLessonVocabularyDTO();
        getLesson.title = lesson.title;
        getLesson.description = lesson.description;
        const learnings = await this.vocabularyRepository.getLesson(lesson_id);

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
}
