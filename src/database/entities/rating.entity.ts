import { Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rating {
    @PrimaryGeneratedColumn('uuid')
    id : string;

    @Column({name : 'user_id'} )
    userId : string;

    @Column({name : 'course_id'})
    courseId : number;

    @Column({name : 'rate',default:1})
    rate : number;
    @DeleteDateColumn({name : 'delete_at'})
    deleteAt : Date;
}