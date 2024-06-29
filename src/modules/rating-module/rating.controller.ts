import { Controller } from "@nestjs/common";
import { RatingService } from "./rating.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class RatingController {
    constructor(private readonly ratingService : RatingService){}

    @MessagePattern('vote-course')
    voteCourse(data : {courseId : number,rate : boolean,userId : string}){
        return this.ratingService.voteCourse(data.courseId,data.userId,data.rate);
    }

    @MessagePattern('get-rating-course')
    getRatingCourse(data : {courseId : number}){
        return this.ratingService.getAverageRatingByCourseId(data.courseId);
    }
    
}