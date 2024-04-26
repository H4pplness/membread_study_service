import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class CourseProgress extends BaseEntity {
    @PrimaryColumn({name : 'participant_id'})
    participantId : number;

    @PrimaryColumn({name : 'learning_id'})
    learningId : number;

    @Column({default : 0})
    progress : number;

    @Column({nullable : true,name : 'last_updated'})
    lastUpdated : Date
}