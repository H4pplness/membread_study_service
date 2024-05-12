/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateCourseDTO } from 'src/dtos/createcourse.dto';
import { CourseService } from 'src/services/course-service/course.service';

@Controller('course')
export class CourseController {
    constructor(
        private readonly courseService : CourseService
    ){}

    @Post()
    @UsePipes(new ValidationPipe())
    async createOne(@Body() createCourse : CreateCourseDTO)
    {
        console.log("CREATE COURSE : ",createCourse);
        const result = await this.courseService.createCourse(createCourse)
        if(!result){
            return result;
        }
        return createCourse;
    }
}
