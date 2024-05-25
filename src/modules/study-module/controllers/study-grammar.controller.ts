import { Body, Controller, Post } from "@nestjs/common";
import { GrammarService } from "../services/grammar.service";
import { CreateLessonGrammarDTO } from "../../../dtos/create-lessons/createlessongrammar.dto";

@Controller('/lesson/grammar-lesson')
export class StudyGrammarController {
    constructor(
        private readonly grammarService : GrammarService
    ){}

    @Post('')
    async createLessonGrammar(@Body() createLessonGrammar : CreateLessonGrammarDTO){
        return this.grammarService.createGrammarLesson(createLessonGrammar);
    }
}