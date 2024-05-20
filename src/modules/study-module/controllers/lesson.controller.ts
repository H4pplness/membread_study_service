import { Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { LessonService } from "../services/lesson.service";
import { QueryResult } from "typeorm";

@Controller('course')
export class LessonController {
    constructor(
        private readonly lessonService : LessonService
    ){}

    @Get('info/')
    async getCourse(@Query('course_id') courseId : number, @Query('user_id') userId : string)
    {
        if(courseId<1){
            throw new NotFoundException();
        }
        return await this.lessonService.getCourseInfo(userId,courseId);
    }

    @Get('learning')
    async getLearningLesson(@Query('user_id') userId : string)
    {
        return await this.lessonService.getLearningCourse(userId);
    }

    @Get('teaching')
    async getTeachingCourse(@Query('user_id') userId : any)
    {
        console.log("USER ID : ",userId);
        return await this.lessonService.getTeachingCourse(userId);
    }
}