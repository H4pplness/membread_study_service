import { BadRequestException, Injectable } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "src/database/entities/course.entity";
import { Participant } from "src/database/entities/participant.entity";
import { UpdateCourseInfoDTO } from "src/dtos/update_course_info.dto";
import { UploadCourseAvatarDTO } from "src/dtos/uploadcourseavatar.dto";
import { Repository } from "typeorm";

@Injectable()
export class SetupParticipantRepository extends Repository<Participant> {
    constructor(
        @InjectRepository(Participant)
        private readonly participantRepository: Repository<Participant>,
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ) {
        super(participantRepository.target, participantRepository.manager, participantRepository.queryRunner)
    }

    public async joinCourse(participant_id: string, course_id: number) {
        console.log("PARTICIPANTID : ", participant_id);
        console.log("COURSEID : ", course_id);
        const participant = await this.participantRepository.findOne({
            where: {
                participant_id: participant_id,
                course_id: course_id
            }
        })
        if (participant) {
            participant.can_study = !participant.can_study;
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

    public async updateCourse(userId: string, updateCourse: UpdateCourseInfoDTO) {
        const dataUpdate: any = {}

        if (updateCourse.title !== undefined && updateCourse.title !== null) {
            dataUpdate.title = updateCourse.title;
        }

        if (updateCourse.description !== undefined && updateCourse.description !== null) {
            dataUpdate.description = updateCourse.description;
        }

        try {
            const course = await this.courseRepository.findOne({ where: { id: updateCourse.courseId } })
            if (course.authorId === userId) await this.courseRepository.update(updateCourse.courseId, dataUpdate);
            else {
                return { "message": "Not permission !", "statusCode": 400 };
            }
            return { "message": "Updated success !", "statusCode": 200 };
        } catch (error) {
            console.log(error);
            throw new ExceptionsHandler()
        }
    }

    public async saveAvatar(uploadData: UploadCourseAvatarDTO) {
        console.log("DATA : ",uploadData.courseId, " ",uploadData.userId);
        const participant = await this.participantRepository.findOne({
            where : {
                participant_id : uploadData.userId,
                course_id : uploadData.courseId
            }
        })
        if(!participant){
            return {
                "message" : "Not found",
                "statusCode" : 404
            }
        }

        console.log("PARTICIPANT : ",JSON.stringify(participant));

        if(participant.can_edit){
            await this.courseRepository.update(uploadData.courseId,{avatar:uploadData.filePath});

            return {
                "path" : uploadData.filePath,
                "message" : "upload success",
                "statusCode" : 201
            }
        }else{
            return {
                "message" : "bad request",
                "statusCode" : 400
            }
        }



    }
}