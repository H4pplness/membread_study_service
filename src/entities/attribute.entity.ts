import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LearningAttribute } from "./learning_attribute.entity";

@Entity()
export class Attribute extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    attribute_name : String;

    @OneToMany(()=>LearningAttribute , learningAttribute => learningAttribute.attribute)
    learning_attribute : LearningAttribute[]
}