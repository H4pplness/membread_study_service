import { IsNotEmpty } from "class-validator";
import { LearningDTO } from "./learning.dto";

export class VocabularyDTO extends LearningDTO {
    @IsNotEmpty()
    vocabulary : string;

    @IsNotEmpty()
    mean : string;

    example? : any[]; 
}