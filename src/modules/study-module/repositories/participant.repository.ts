import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Participant } from "src/database/entities/participant.entity";
import { Repository } from "typeorm";

@Injectable()
export class ParticipantRepository extends Repository<Participant> {
    constructor(
        @InjectRepository(Participant) private readonly participantRepository: Repository<Participant>
    ) {
        super(participantRepository.target, participantRepository.manager, participantRepository.queryRunner)
    }
}