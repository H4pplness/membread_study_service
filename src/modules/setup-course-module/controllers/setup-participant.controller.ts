import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SetupParticipantService } from "../services/setup-participant.service";
import { MessagePattern } from "@nestjs/microservices";
import { CreateCourseDTO } from "src/dtos/createcourse.dto";

@Controller('course')
export class SetupParticipantController {
    constructor(
        private readonly setupParticipantService : SetupParticipantService
    )
    {}

    @MessagePattern('join-course')
    joinCourse(data:{participant_id : string,course_id : number})
    {   
        return this.setupParticipantService.joinCourse(data.participant_id,data.course_id);
    }

    @MessagePattern('create-course')
    createCourse(data : {createCourse : CreateCourseDTO,userId : string})
    {
        return this.setupParticipantService.createCourse(data.createCourse,data.userId);
    }

}