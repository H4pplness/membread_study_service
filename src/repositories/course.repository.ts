import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "src/entities/course.entity";
import { Repository } from "typeorm";


export class CourseRepository extends Repository<Course>{
    constructor(
        @InjectRepository(Course)
        private courseRepository : Repository<Course>
    ){
        super(
            courseRepository.target,
            courseRepository.manager,
            courseRepository.queryRunner
        );
    }
}