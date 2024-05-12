import { IsNotEmpty } from "class-validator";

export class UpdateProgressLessonDTO {
    @IsNotEmpty()
    course_id : number;

    @IsNotEmpty()
    lesson_id? : number;

    @IsNotEmpty()
    user_id? : number;

    score? : number;
}