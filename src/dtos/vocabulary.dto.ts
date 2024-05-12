import { IsNotEmpty, IsString } from "class-validator";


export class Vocabulary {
    learning_id? : number;

    @IsString()
    vocabulary? : string;

    @IsString()
    mean? : string;
}