import { IsNotEmpty } from "class-validator";

export class LessonInfo {
    id : number;

    @IsNotEmpty()
    title? : string;

    description? : string;

    courseId? : number;
}