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
        return listLesson;
    }

    async getUserLearningLesson(userId : number)
    {
        return await this.dataSource.createQueryBuilder(Participant,'participant')
            .select('participant.course_id as course_id')
            .addSelect('course.title,course.description,course.rating')
            .innerJoin('course','course','participant.course_id = course.id')
            .where('participant.participant_id = '+userId)
            .getRawMany();
    }

    async getTeachingCourse(userId : number)
    {
        return await this.courseRepository.find({
            where:{authorId : userId}
        })
    }

    async getCurrentLesson(participantId : number , courseId : number)
    {
        
    }
}