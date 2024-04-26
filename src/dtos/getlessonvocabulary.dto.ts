import { GetLessonDTO } from "./getlesson.dto";
import { Vocabulary } from "./vocabulary.dto";

export class GetLessonVocabularyDTO extends GetLessonDTO {
    listVocabulary : Vocabulary[];
    
    title: string;
}