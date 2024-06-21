import { InjectRepository } from "@nestjs/typeorm";
import { Rating } from "src/database/entities/rating.entity";
import { Repository } from "typeorm";


export class RatingRepository extends Repository<Rating>{
    constructor(@InjectRepository(Rating) private readonly ratingRepository : Repository<Rating>){
        super(ratingRepository.target,ratingRepository.manager,ratingRepository.queryRunner)
    }

    getAverageRatingByCourseId(courseId: number) {
        throw new Error("Method not implemented.");
    }   
}