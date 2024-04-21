import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateCourseDTO {
    @IsNotEmpty({message : 'Please enter title'})
    @IsString()
    title : String;

    @IsString()
    description : String;

    @IsNumber()
    author_id : number;
} 