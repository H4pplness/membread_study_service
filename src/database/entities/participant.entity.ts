import { BaseEntity, Column, DeleteDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SoftDeleteQueryBuilder } from "typeorm/query-builder/SoftDeleteQueryBuilder";

@Entity()
export class Participant extends BaseEntity{
    @PrimaryColumn()
    participant_id : number;

    @PrimaryColumn()
    course_id : number;

    @Column({default : 0})
    can_edit : boolean

    @Column({default : 0})
    can_study : boolean

    @Column({default : 0})
    can_remove_participant : boolean

    @Column({default : 0})
    can_add_admin : boolean
    
    @DeleteDateColumn()
    delete_at : Date;

    @Column({nullable : true,name : 'current_lesson'})
    currentLesson : number
}