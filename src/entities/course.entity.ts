import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Lesson } from "./lesson.entity";

@Entity()
export class Course extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title : String; 

    @Column({nullable : true})
    author_id : number;
    
    @Column({nullable : true})
    description : String 

    @Column({type : "integer" , nullable : true})
    numberOfParticipants : number

    @Column({type : "integer" ,  nullable : true})
    numberOfLessons : number 

    @Column({type : "float" , default : 5})
    rating : number

    @OneToMany(type => Lesson , lesson => lesson.course)
    lessons : Lesson[]

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
}