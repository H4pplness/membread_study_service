import { BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Attribute } from "./attribute.entity";
import { Learning } from "./learning.entity";

@Entity()
export class LearningAttribute extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;
    
    @ManyToOne(()=>Learning , learning => learning.learning_attribute)
    learning: Learning;

    @ManyToOne(()=>Attribute , attribute => attribute.learning_attribute)
    attribute : Attribute;

    @Column({default:''})
    value : String;
}