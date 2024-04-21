import { CreateCourseDTO } from "src/dtos/createcourse.dto";
import { InfoCourseDTO } from "src/dtos/infocourse.dto";

export interface ICourseService {
    getCourseInfo() : InfoCourseDTO;

    createCourse(createCourse : CreateCourseDTO);

    joinCourse();
}