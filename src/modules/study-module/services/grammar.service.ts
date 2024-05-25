import { Injectable } from "@nestjs/common";
import { CreateLessonGrammarDTO } from "../../../dtos/create-lessons/createlessongrammar.dto";
import { GrammarRepository } from "../repositories/grammar.repository";

@Injectable()
export class GrammarService {
    constructor(
        private readonly grammarRepository : GrammarRepository
    ){}

    async createGrammarLesson(createLessonGrammarDTO : CreateLessonGrammarDTO){
        return this.grammarRepository.createLesson(createLessonGrammarDTO);
    }
}