import { Controller, Get, HttpStatus, Param, Res } from "@nestjs/common";
import { LessonService } from "src/services/lesson-service/lesson.service";


@Controller('lesson')
export class LessonController {
    constructor(
        private readonly lessonService: LessonService
    ) { }

    @Get(':id')
    getOne(@Param() params) {
        const result = this.lessonService.getLesson(params.id);
        
        return result;
    }
}