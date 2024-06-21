import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from "./lesson.entity";
import { LearningAttribute } from "./learning_attribute.entity";

@Entity()
export class Learning extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(()=>Lesson , lesson => lesson.learnings)
    @JoinColumn({name : 'lesson_id'})
    lesson : Lesson;

    @OneToMany(()=>LearningAttribute , learningAttribute => learningAttribute.learning)
    learning_attribute : LearningAttribute[];

    @Column({name : 'learning_type'})
    type : string;

}