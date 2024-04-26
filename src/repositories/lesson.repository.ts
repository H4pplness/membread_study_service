import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateLessonDTO } from "src/dtos/createlesson.dto";
import { Attribute } from "src/database/entities/attribute.entity";
import { Learning } from "src/database/entities/learning.entity";
import { LearningAttribute } from "src/database/entities/learning_attribute.entity";
import { Lesson } from "src/database/entities/lesson.entity";
import { DataSource, Repository } from "typeorm";
import { Course } from "src/database/entities/course.entity";

@Injectable()
export class LessonRepository{
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository : Repository<Course>,
        @InjectRepository(Lesson)
        private readonly lessonRepository : Repository<Lesson>,
        @InjectRepository(Learning)
        private readonly learningRepository : Repository<Learning>,
        @InjectRepository(Attribute)
        private readonly attributeRepository : Repository<Attribute>,
        @InjectRepository(LearningAttribute)
        private readonly learningAttributeRepository : Repository<LearningAttribute>,
        private dataSource : DataSource
    ){} 

    async getLessonInfo(id : number) : Promise<Lesson>
    {
        const lesson = await this.lessonRepository.findOne({
            where : {
                id 
            }});
        if(!lesson) {
            throw new Error('Not found lesson with id = '+id);
        }

        return lesson;
    }

    async createLessonVocabulary(createLessonDTO : CreateLessonDTO)
    {
        const course = await this.courseRepository.findOne({
            where : { id : createLessonDTO.course_id}
        })

        if(!course){
            throw new Error("Not found with id = "+createLessonDTO.course_id);
        }

        const lesson = new Lesson();
        lesson.title = createLessonDTO.title;
        lesson.description = createLessonDTO.description;
        lesson.course = course;
        lesson.save();

        const learnings : Learning[] = [];
        const learning_attributes : LearningAttribute[] = [];
        
        const vocabulary_attr = await Attribute.findOne({where : {id : 1}});
        const mean_attr = await Attribute.findOne({where : {id : 2}});

        createLessonDTO.listVocabulary.forEach(async (vocabulary)=>{
            const learning = new Learning();
            learning.lesson = lesson;
            learnings.push(learning);

            const learningVocabulary = new LearningAttribute();
            const learningMean = new LearningAttribute();

            learningVocabulary.attribute = vocabulary_attr;
            learningVocabulary.value = vocabulary.vocabulary;
            learningVocabulary.learning = learning;

            learningMean.attribute = mean_attr;
            learningMean.value = vocabulary.mean;
            learningMean.learning = learning;

            learning_attributes.push(learningVocabulary);
            learning_attributes.push(learningMean);
        })

        await this.learningRepository.save(learnings);
        await this.learningAttributeRepository.save(learning_attributes);

        return lesson;
    }

    async getLesson(id : number){
        return await this.dataSource.createQueryBuilder(Learning,'learning')
        .select('learning.type as type,learning.id as id')
        .addSelect('learning_attribute.value as value')
        .addSelect('attribute.attribute_name as attribute')
        .innerJoin('learning_attribute','learning_attribute','learning.id = learning_attribute.learning_id')
        .innerJoin('attribute','attribute','learning_attribute.attribute_id = attribute.id')
        .where('learning.lesson_id = '+id)
        .getRawMany();
    }
}

