import { Injectable } from "@nestjs/common";
import { SetupParticipantRepository } from "../repositories/setup-participant.repository";

@Injectable()
export class SetupParticipantService {
    constructor(
        private readonly setupParticipantRepository : SetupParticipantRepository
    ){}

    public async joinCourse(participant_id : string , course_id : number)
    {
        const result = await this.setupParticipantRepository.joinCourse(participant_id,course_id);
        return result;
    }   
}