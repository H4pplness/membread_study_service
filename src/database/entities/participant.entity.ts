import { BaseEntity, Column, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SoftDeleteQueryBuilder } from "typeorm/query-builder/SoftDeleteQueryBuilder";

@Entity()
export class Participant extends BaseEntity{
    @PrimaryColumn()
    participant_id : string;

    @PrimaryColumn()
    course_id : number;

    @Column({default : false})
    can_edit : boolean

    @Column({default : false})
    can_study : boolean

    @Column({default : false})
    can_remove_participant : boolean

    @Column({default : false})
    can_add_admin : boolean
    
    @DeleteDateColumn()
    delete_at : Date;

    @Column({nullable : true,name : 'current_lesson'})
    currentLesson : number

    @Column({nullable : true})
    last_studied : Date
}