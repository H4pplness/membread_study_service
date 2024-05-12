import { Controller, Get, NotFoundException, Param, Query } from "@nestjs/common";
import { LessonService } from "../services/lesson.service";

@Controller('course')
export class LessonController {
    constructor(
        private readonly lessonService : LessonService
    ){}

    @Get('info/')
    async getCourse(@Query('course_id') courseId : number, @Query('user_id') userId : number)
    {
        if(courseId<1){
            throw new NotFoundException();
        }
        return await this.lessonService.getCourseInfo(userId,courseId);
    }

    @Get('learning/:userId')
    async getLearningLesson(@Param() param)
    {
        if(param.userId < 1){
            throw new NotFoundException();
        }

        return await this.lessonService.getLearningCourse(param.userId);
    }

    @Get('teaching')
    async getTeachingCourse(@Query('user_id') userId : any)
    {
        console.log("USER ID : ",userId);
        return await this.lessonService.getTeachingCourse(userId);
    }
}