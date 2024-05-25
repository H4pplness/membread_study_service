import { BadRequestException, Injectable } from "@nestjs/common";
import { SetupParticipantRepository } from "../repositories/setup-participant.repository";
import { CreateCourseDTO } from "src/dtos/createcourse.dto";
import { Course } from "src/database/entities/course.entity";
import { Participant } from "src/database/entities/participant.entity";

@Injectable()
export class SetupParticipantService {
    constructor(
        private readonly setupParticipantRepository: SetupParticipantRepository
    ) { }

    public async joinCourse(participant_id: string, course_id: number) {
        const result = await this.setupParticipantRepository.joinCourse(participant_id, course_id);
        return result;
    }

    public async createCourse(createCourse: CreateCourseDTO, userId: string) {
        try {
            var course = new Course();
            course.title = createCourse.title;
            course.description = createCourse.description;
            course.authorId = userId;

            await course.save();

            var participant = new Participant();
            participant.course_id = course.id;
            participant.participant_id = userId;
            participant.can_add_admin = true;
            participant.can_edit = true;
            participant.can_remove_participant = true;
            participant.can_study = true;

            await participant.save();
        } catch (error) {
            throw new BadRequestException(error)
        }


    }
}