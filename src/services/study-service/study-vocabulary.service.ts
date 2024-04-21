import { Injectable } from "@nestjs/common";
import { StudyBaseService } from "./study-base.service";
import { Vocabulary } from "src/dtos/vocabulary.dto";

@Injectable()
export class StudyVocabularyService implements StudyBaseService<Vocabulary> {
    getLesson(lesson_id : number): Vocabulary[] {
        throw new Error("Method not implemented.");
    }
    getProgress(lesson_id : number): number {
        throw new Error("Method not implemented.");
    }
    study() : Vocabulary[] {
        throw new Error("Method not implemented.");
    }
    setGoal(): number {
        throw new Error("Method not implemented.");
    }

}