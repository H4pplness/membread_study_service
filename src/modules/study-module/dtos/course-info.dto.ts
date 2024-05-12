import { LessonInfo } from "src/dtos/lessoninfo.dto";

export class CourseInfoDTO {
    title? : string;

    description? : string;

    authorId? : number;

    listLesson ? : LessonInfo[]

    currentLesson ? : number;
}