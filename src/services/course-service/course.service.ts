import { CreateCourseDTO } from "src/dtos/createcourse.dto";
import { InfoCourseDTO } from "src/dtos/infocourse.dto";
import { ICourseService } from "./icourse.service";
import { Injectable } from "@nestjs/common";
import { CourseRepository } from "src/repositories/course.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "src/entities/course.entity";

@Injectable()
export class CourseService implements ICourseService {
    constructor(
        private readonly courseRepository : CourseRepository
    ){}

    getCourseInfo(): InfoCourseDTO {
        throw new Error("Method not implemented.");
    }
    async createCourse(createCourse : CreateCourseDTO) {
        const title = createCourse.title;
        const author_id = createCourse.author_id;
        const description = createCourse.description;
        const course = this.courseRepository.create({title , author_id ,description})
        return this.courseRepository.save(course)
    }
    joinCourse() {
        throw new Error("Method not implemented.");
    }

}