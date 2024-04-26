import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Course } from "./course.entity";
import { Learning } from "./learning.entity";

@Entity()
export class Lesson extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    title: string;

    @Column()
    description: string;

    @Column({default : 1})
    type : number

    @ManyToOne(() => Course, course => course.lessons)
    @JoinColumn({name : 'course_id'})
    course: Course;
    
    @CreateDateColumn({
        default : 'now()',
        nullable : true
    })
    created_at : Date

    @UpdateDateColumn({
        default : 'now()',
        nullable : true
    })
    updated_at : Date

    @DeleteDateColumn()
    deleteAt : Date

    @OneToMany(()=>Learning, learning =>  learning.lesson)
    learnings: Learning[];
}