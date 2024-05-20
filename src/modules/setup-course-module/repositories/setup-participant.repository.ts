import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Participant } from "src/database/entities/participant.entity";
import { Repository } from "typeorm";

@Injectable()
export class SetupParticipantRepository {
    constructor(
        @InjectRepository(Participant)
        private readonly participantRepository : Repository<Participant>
    ){}

    public async joinCourse(participant_id: string, course_id: number) {
        const participant = await this.participantRepository.findOne({
            where : {
                participant_id : participant_id,
                course_id : course_id
            }
        })
        if (participant) {
            participant.can_study = true;
            await participant.save();
            return participant;
        }

        const new_participant = new Participant()
        new_participant.can_study = true;
        new_participant.course_id = course_id;
        new_participant.participant_id = participant_id;

        await new_participant.save();
        return new_participant;
    }
}