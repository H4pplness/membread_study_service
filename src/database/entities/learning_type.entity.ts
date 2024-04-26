import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Learning } from "./learning.entity";
import { Attribute } from "./attribute.entity";

@Entity()
export class LearningType extends BaseEntity {
    @PrimaryGeneratedColumn()
    id : number

    @Column({name : 'type'})
    type : string;

    @OneToMany(()=>Learning,learning => learning.learningType)
    learnings : Learning[];

    @OneToMany(()=>Attribute,attribute => attribute.learningType)
    attributes : Attribute[];
}