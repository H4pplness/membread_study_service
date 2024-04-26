import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from "./lesson.entity";
import { LearningAttribute } from "./learning_attribute.entity";
import { LearningType } from "./learning_type.entity";

@Entity()
export class Learning extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @ManyToOne(()=>Lesson , lesson => lesson.learnings)
    @JoinColumn({name : 'lesson_id'})
    lesson : Lesson;

    @OneToMany(()=>LearningAttribute , learningAttribute => learningAttribute.learning)
    learning_attribute : LearningAttribute[];

    @ManyToOne(()=>LearningType, learningType => learningType.learnings)
    @JoinColumn({name : 'learning_type'})
    learningType : LearningType;
}