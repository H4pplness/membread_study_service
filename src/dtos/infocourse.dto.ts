import { IsNotEmpty } from "class-validator";

export class InfoCourseDTO {
    title : string;

    description : string;

    rating : number;

    numberOfLessons : number;

    numberOfParticipants : number;
}