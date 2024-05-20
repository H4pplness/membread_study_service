import { LessonInfo } from "src/dtos/lessoninfo.dto";

export class CourseInfoDTO {
    title? : string;

    description? : string;

    authorId? : string;

    listLesson ? : LessonInfo[]

    currentLesson ? : number;
}