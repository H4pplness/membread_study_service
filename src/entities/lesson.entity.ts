import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Course } from "./course.entity";
import { Learning } from "./learning.entity";

@Entity()
export class Lesson extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number;
    
    @Column()
    title: String;

    @Column()
    description: String;

    @ManyToOne(() => Course, course => course.lessons)
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