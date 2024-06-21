import { Controller } from "@nestjs/common";
import { LessonService } from "../services/lesson.service";
import { TestService } from "../services/test.service";
import { MessagePattern } from "@nestjs/microservices";
import { CreateLessonTestDTO } from "src/dtos/create-lessons/createlessontest.dto";

@Controller()
export class StudyTestController {
    constructor(
        private lessonService : LessonService,
        private testService : TestService
    ){}

    @MessagePattern('create-lesson-test')
    async createLessonTest(data : {createLessonTest : CreateLessonTestDTO}){
        try{
            console.log("DATA : ",data.createLessonTest);
            const result = await this.testService.createLesson(data.createLessonTest);
            return result;
        }catch(error){
            return error;
        }
    }
}