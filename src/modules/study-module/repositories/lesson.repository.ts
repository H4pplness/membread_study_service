import { Injectable } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Course } from "src/database/entities/course.entity";
import { Lesson } from "src/database/entities/lesson.entity";
import { Participant } from "src/database/entities/participant.entity";
import { DataSource, Repository } from "typeorm";
import { ParticipantRepository } from "./participant.repository";

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
            .addSelect('course.title,course.description,course.rating,course.avatar')
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
            .addSelect('course.title,course.description,course.rating,course.avatar')
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
            where:{authorId : userId}
        })
    }

    async getPopularCourse()
    {

        return await this.dataSource.createQueryBuilder(Course,'course')
            .select('course.id as id , course.title  as title, course.description as description, course.rating as rating, course.author_id as author_id,course.avatar as avatar')
            .addSelect('COUNT(participant.participant_id) as number_of_participants')
            .innerJoin('participant','participant','participant.course_id = course.id')
            .groupBy('course.id')
            .limit(10)
            .getRawMany();
    }
}