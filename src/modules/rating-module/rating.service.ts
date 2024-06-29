import { Injectable } from "@nestjs/common";
import { RatingRepository } from "./rating.repository";
import { Rating } from "src/database/entities/rating.entity";

@Injectable()
export class RatingService {
    constructor(private readonly ratingRepository : RatingRepository){}

    async voteCourse(courseId: number, userId: string, rate: boolean) {
        const rating = new Rating();
        rating.courseId = courseId;
        rating.userId = userId;
        rating.rate = rate?1:-1;

        return await this.ratingRepository.save(rating);
    }

    async getAverageRatingByCourseId(courseId : number) : Promise<{rating : number}> {
        return await this.ratingRepository.getAverageRatingByCourseId(courseId);
    }
}