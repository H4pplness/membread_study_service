import { Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { LessonService } from "../services/lesson.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class LessonController {
    constructor(
        private readonly lessonService : LessonService
    ){}

    @MessagePattern('get-course-info')
    async getCourse(data : {userId : string,courseId : number})
    {
        if(data.courseId<1){
            throw new NotFoundException();
        }
        return await this.lessonService.getCourseInfo(data.userId,data.courseId);
    }

    @MessagePattern('learning-courses')
    async getLearningLesson(data : {userId : string})
    {
        return await this.lessonService.getLearningCourse(data.userId);
    }

    @MessagePattern('teaching-courses')
    async getTeachingCourse(data : {userId : string})
    {
        return await this.lessonService.getTeachingCourse(data.userId);
    }

}