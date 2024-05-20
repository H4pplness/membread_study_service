import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { SetupParticipantService } from "../services/setup-participant.service";

@Controller('course')
export class SetupParticipantController {
    constructor(
        private readonly setupParticipantService : SetupParticipantService
    )
    {}

    @Post('/join')
    public joinCourse(@Body() body:{participant_id : string,course_id : number})
    {   
        return this.setupParticipantService.joinCourse(body.participant_id,body.course_id);
    }

    // @Post('/')
    // public 
}