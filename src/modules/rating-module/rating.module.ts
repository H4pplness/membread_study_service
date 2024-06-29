import { Module } from "@nestjs/common";
import { RatingController } from "./rating.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rating } from "src/database/entities/rating.entity";
import { RatingService } from "./rating.service";
import { RatingRepository } from "./rating.repository";

@Module({
    imports : [TypeOrmModule.forFeature([Rating])],
    controllers: [RatingController],
    providers: [RatingService,RatingRepository],
    exports: [RatingService]
})
export class RatingModule {}