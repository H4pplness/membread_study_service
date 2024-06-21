import { Injectable } from "@nestjs/common";
import { LessonRepository } from "../repositories/lesson.repository";
import { TestRepository } from "../repositories/test.repository";
import { CreateLessonTestDTO } from "src/dtos/create-lessons/createlessontest.dto";

@Injectable()
export class TestService {
    constructor(
        private readonly lessonRepository : LessonRepository,
        private readonly testRepository : TestRepository
    ){}

    async createLesson (createLessonTest : CreateLessonTestDTO){
        return await this.testRepository.createLesson(createLessonTest);
    }
}