import { CreateCourseDTO } from "src/dtos/createcourse.dto";
import { InfoCourseDTO } from "src/dtos/infocourse.dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "src/database/entities/course.entity";
import { Repository } from "typeorm";

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository : Repository<Course>
    ){}

    getCourseInfo(): InfoCourseDTO {
        throw new Error("Method not implemented.");
    }

    async createCourse(createCourse : CreateCourseDTO) {
        const title = createCourse.title;
        const authorId = createCourse.author_id;
        const description = createCourse.description;
        const course = this.courseRepository.create({title , authorId ,description})
        return this.courseRepository.save(course)
    }
    
    joinCourse() {
        throw new Error("Method not implemented.");
    }

}