import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateLessonDTO } from "src/dtos/createlesson.dto";
import { CourseService } from "src/services/course-service/course.service";
import { LessonService } from "src/services/lesson-service/lesson.service";
import { StudyVocabularyService } from "src/services/study-service/study-vocabulary.service";

@Controller('study')
export class StudyController {
    constructor(
        private readonly studyService : StudyVocabularyService,
        private readonly courseService : CourseService,
        private readonly lessonService : LessonService
    ){}

    @Get(':id')
    getLesson(@Param() params : any)
    {
        return this.lessonService.getLesson(params.id);
    }

    @Post()
    addLesson(@Body() createLesson : CreateLessonDTO)
    {
        return this.lessonService.createLesson(createLesson);
    }
}