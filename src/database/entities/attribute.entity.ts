import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { LearningAttribute } from "./learning_attribute.entity";
import { LearningType } from "./learning_type.entity";

@Entity()
export class Attribute extends BaseEntity{
    @PrimaryColumn()
    id : number;

    @Column()
    attribute_name : String;

    @OneToMany(()=>LearningAttribute , learningAttribute => learningAttribute.attribute)
    learningAttribute : LearningAttribute[]

    @ManyToOne(()=>LearningType , learningType => learningType.attributes)
    @JoinColumn({name : 'learning_type'})
    learningType : LearningType;
}