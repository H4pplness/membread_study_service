import { Injectable, NotFoundException } from "@nestjs/common";
import { LessonRepository } from "../repositories/lesson.repository";
import { LessonInfo } from "src/dtos/lessoninfo.dto";
import { Repository } from "typeorm";
import { Course } from "src/database/entities/course.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ParticipantRepository } from "../repositories/participant.repository";
import { UserService } from "src/modules/user-service-module/user.service";
import { Lesson } from "src/database/entities/lesson.entity";
import { RatingService } from "src/modules/rating-module/rating.service";

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        private readonly lessonRepository: LessonRepository,
        private readonly participantRepository: ParticipantRepository,
        private readonly userService: UserService,
        private readonly ratingService : RatingService,
    ) { }

    public async getCourseInfo(userId: string, courseId: number) {
        let courseInfo: any = {};
        const course = await this.courseRepository.findOne({ where: { id: courseId } });

        if (!course) {
            throw new NotFoundException();
        }

        courseInfo.title = course.title;
        courseInfo.description = course.description;
        courseInfo.avatar = course.avatar;
        // courseInfo.authorId = course.authorId;

        const listLesson = await this.lessonRepository.getLessonByCourseId(courseId);
        const lessonsOfCourse = listLesson.map((lesson) => {
            let lessonInfo = new LessonInfo();
            lessonInfo.id = lesson.id;
            lessonInfo.courseId = courseId;
            lessonInfo.description = lesson.description;
            lessonInfo.title = lesson.title;
            lessonInfo.type = lesson.type;
            return lessonInfo;
        });

        const currentLesson = await this.participantRepository.findOne({
            where: {
                participant_id: userId,
                course_id: courseId
            }
        });

        if (!currentLesson) {
            courseInfo.canStudy = false;
        } else {
            if (currentLesson.can_study) {
                courseInfo.canStudy = true;
            } else {
                courseInfo.canStudy = false;
            }
        }

        courseInfo.listLesson = lessonsOfCourse;

        courseInfo.author = await this.userService.getUserInfo(course.authorId);
        const rating = await this.ratingService.getAverageRatingByCourseId(courseId);
        courseInfo.rating = rating.rating;
        console.log("COURSEINFO : ",courseInfo);
        return courseInfo;
    }

    public async getLearningCourse(userId: string) {
        return await this.lessonRepository.getUserLearningLesson(userId);
    }

    public async getTeachingCourse(userId: string) {
        return await this.lessonRepository.getTeachingCourse(userId);
    }

    public async getRecentCourse(userId:string ,limit : number){
        return await this.lessonRepository.getRecentCourse(userId,limit);
    };

    public async selectLesson(userId: number, lessonId: number, course: number) {

    }

    public async getPopularCourse(userId : string){
        const popularCourses = await this.lessonRepository.getPopularCourse();
        const learningCourses = await this.lessonRepository.getUserLearningLesson(userId);

        return popularCourses.map((course)=>{
          if(learningCourses.find((learningCourse)=>learningCourse.id === course.id)){
            return {...course,canStudy : true}
          } else{
            return {...course,canStudy : false}
          } 
        })
    }

    public async getLesson(lesson_id : number,userId : string)
    {
        console.log("LESSON ID : ",lesson_id);
        const lesson = await Lesson.findOne({where : {id : lesson_id}});
        if(!lesson)
        {
            throw new NotFoundException()
        }

        const getLesson : any = {};
        getLesson.title = lesson.title;
        getLesson.description = lesson.description;
        getLesson.type = lesson.type;
        const learnings = await this.lessonRepository.getLesson(lesson_id,userId);
        console.log("LEARNINGS : ",JSON.stringify(learnings));
        
        const mergedData = {};
        
        learnings.forEach(item => {
            const itemId = item.id;
            
            if (!mergedData[itemId]) {
                mergedData[itemId] = { id: itemId };
            }
            
            mergedData[itemId][item.attribute] = item.value;

            if (!("progress" in mergedData[itemId])) {
                mergedData[itemId]["progress"] = item.progress;
                mergedData[itemId]["need_to_review"] = item.need_to_review;
                mergedData[itemId]["last_updated"] = item.last_updated;
            }
        });

        const result = Object.values(mergedData);

        getLesson.listLearning = result;

        return getLesson;
    }
}