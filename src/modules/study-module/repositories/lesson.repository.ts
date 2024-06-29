import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Course } from "src/database/entities/course.entity";
import { Lesson } from "src/database/entities/lesson.entity";
import { Participant } from "src/database/entities/participant.entity";
import { DataSource, Repository } from "typeorm";
import { ParticipantRepository } from "./participant.repository";
import { Learning } from "src/database/entities/learning.entity";

@Injectable()
export class LessonRepository extends Repository<Lesson>{
    constructor(
        @InjectRepository(Lesson) private readonly lessonRepository : Repository<Lesson>,
        @InjectRepository(Course) private readonly courseRepository : Repository<Course>,
        @InjectDataSource() private readonly dataSource : DataSource,
        private readonly participantRepository : ParticipantRepository
    ){
        super(lessonRepository.target,lessonRepository.manager,lessonRepository.queryRunner)
    }

    async getLessonByCourseId(courseId : number)
    {
        const listLesson = await this.lessonRepository.find({where : {course : {id : courseId}}});

        console.log("LIST LESSON : ",JSON.stringify(listLesson,null,2));

        return listLesson;
    }

    async getUserLearningLesson(userId : string)
    {
        return await this.dataSource.createQueryBuilder(Participant,'participant')
            .select('participant.course_id as id')
            .addSelect('course.title,course.description,course.avatar')
            .innerJoin('course','course','participant.course_id = course.id')
            .where("participant.participant_id ='"+userId+"'")
            .andWhere("participant.can_study = true")
            .orderBy("participant.last_studied",'DESC')
            .getRawMany();
    }

    async getRecentCourse(userId : string,limit : number)
    {
        return await this.dataSource.createQueryBuilder(Participant,'participant')
            .select('participant.course_id as id')
            .addSelect('course.title,course.description,course.avatar')
            .innerJoin('course','course','participant.course_id = course.id')
            .where("participant.participant_id ='"+userId+"'")
            .andWhere("participant.can_study = true")
            .orderBy("participant.last_studied",'DESC')
            .limit(limit)
            .getRawMany();
    }

    async getTeachingCourse(userId : string)
    {
        return await this.courseRepository.find({
            select:['id','title','description','authorId','avatar'],
            where:{authorId : userId}
        })
    }

    async getPopularCourse()
    {

        return await this.dataSource.createQueryBuilder(Course,'course')
            .select('course.id as id , course.title  as title, course.description as description, course.author_id as author_id,course.avatar as avatar')
            .addSelect('COUNT(participant.participant_id) as number_of_participants')
            .innerJoin('participant','participant','participant.course_id = course.id')
            .groupBy('course.id')
            .limit(10)
            .getRawMany();
    }

    async getLesson(lesson_id: number, userId: string) {
        return await this.dataSource.createQueryBuilder(Learning, 'learning')
            .select('learning.learning_type as type,learning.id as id')
            .addSelect('learning_attribute.value as value')
            .addSelect('attribute.attribute_name as attribute')
            .addSelect('course_progress.progress as progress,course_progress.last_updated as last_updated,course_progress.need_to_review as need_to_review')
            .innerJoin('learning_attribute', 'learning_attribute', 'learning.id = learning_attribute.learning_id')
            .innerJoin('attribute', 'attribute', 'learning_attribute.attribute_id = attribute.id')
            .leftJoin('course_progress', 'course_progress', "learning.id = course_progress.learning_id AND course_progress.participant_id ='" + userId + "'")
            .where('learning.lesson_id = ' + lesson_id)
            .orderBy('learning.id')
            .getRawMany();
    }
}