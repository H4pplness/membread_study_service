import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Attribute } from "./attribute.entity";
import { Learning } from "./learning.entity";

@Entity()
export class LearningAttribute extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;
    
    @ManyToOne(()=>Learning , learning => learning.learning_attribute)
    @JoinColumn({name : 'learning_id'})
    learning: Learning;

    @ManyToOne(()=>Attribute , attribute => attribute.learningAttribute)
    @JoinColumn({name : 'attribute_id'})
    attribute : Attribute;

    @Column({default:''})
    value : String;
}