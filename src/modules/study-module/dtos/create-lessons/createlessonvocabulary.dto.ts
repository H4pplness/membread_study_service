import { Vocabulary } from "src/dtos/vocabulary.dto";
import { CreateLessonDTO } from "./createlesson.dto";

export class CreateLessonVocabularyDTO extends CreateLessonDTO{
    listVocabulary? : Vocabulary[];
}