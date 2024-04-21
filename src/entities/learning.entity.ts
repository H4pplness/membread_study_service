import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Lesson } from "./lesson.entity";
import { LearningAttribute } from "./learning_attribute.entity";

@Entity()
export class Learning extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    type : String;

    @ManyToOne(()=>Lesson , lesson => lesson.learnings)
    lesson : Lesson;

    @OneToMany(()=>LearningAttribute , learningAttribute => learningAttribute.learning)
    learning_attribute : LearningAttribute[];
}