import { Injectable } from "@nestjs/common";
import { CreateLessonDTO } from "src/dtos/createlesson.dto";
import { GetLessonVocabularyDTO } from "src/dtos/getlessonvocabulary.dto";
import { Vocabulary } from "src/dtos/vocabulary.dto";
import { LessonRepository } from "src/repositories/lesson.repository";

@Injectable()
export class LessonService {
    constructor(
        private readonly lessonRepository : LessonRepository,
    ){}

    async createLesson(createLesson : CreateLessonDTO) {
        const result =  await this.lessonRepository.createLessonVocabulary(createLesson);
        if(!result)
            {
                return result
            }
        return createLesson;
    }


    async getLesson(id : number) {
        const lesson = await this.lessonRepository.getLessonInfo(id);
        /**
         * Nếu có thêm bài học khác ngoài từ vựng thì phải code thêm
         */ 
        const getLesson = new GetLessonVocabularyDTO();
        getLesson.title = lesson.title;
        getLesson.description = lesson.description;
        const learnings = await this.lessonRepository.getLesson(id);

        const listVocabulary : Vocabulary[] = []
        
        learnings.forEach((item)=>{
            const voca_index = listVocabulary.findIndex((vocabulary)=>vocabulary.learning_id === item.id)
            if(voca_index === -1){
                if(item.attribute == 'vocabulary'){
                    listVocabulary.push({
                        learning_id : item.id,
                        vocabulary : item.value,
                        mean : ''
                    })
                }else{
                    listVocabulary.push({
                        learning_id : item.id,
                        mean : item.value,
                        vocabulary : ''
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