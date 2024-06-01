import { IsNotEmpty } from "class-validator";

export class UpdateProgressLessonDTO {    
    course_id : number;

    lesson_id? : number;

    user_id? : string;

    score? : number;
}