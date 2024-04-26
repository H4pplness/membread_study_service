/*
https://docs.nestjs.com/controllers#controllers
*/

// import { Body, Controller, Get, Param, Post } from '@nestjs/common';
// import { CreateCourseDTO } from 'src/dtos/createcourse.dto';
// import { CreateLessonDTO } from 'src/dtos/createlesson.dto';
// import { CourseService } from 'src/services/course-service/course.service';

// @Controller('course')
// export class CourseController {
//     constructor(
//         private readonly courseService : CourseService
//     ){}

//     @Get('')
//     getHello()
//     {
//         return "HELLO WORLD";
//     }

//     @Get(':id')
//     getOne(@Param() params : any)
//     {
//         return params.id;
//     }

//     @Post()
//     createOne(@Body() createCourse : CreateCourseDTO)
//     {
//         const result = this.courseService.createCourse(createCourse)
//         if(!result){
//             return result;
//         }

//         return createCourse;
//     }
// }
