import { CreateLessonDTO } from "./createlesson.dto";
import { Vocabulary } from "./vocabulary.dto";

export class CreateLessonVocabularyDTO extends CreateLessonDTO {
    listVocabulary : Vocabulary[];
}