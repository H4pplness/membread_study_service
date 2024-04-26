import { IsNotEmpty } from "class-validator";
import { Vocabulary } from "./vocabulary.dto";

export class CreateLessonDTO {
    @IsNotEmpty()
    title : string;

    description : string;

    @IsNotEmpty()
    course_id : number;

    listVocabulary : Vocabulary[];
}