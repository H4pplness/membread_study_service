import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Lesson } from "./lesson.entity";

@Entity()
export class Course extends BaseEntity{
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    title : string; 

    @Column({nullable : true,name : 'author_id'})
    authorId : string;
    
    @Column({nullable : true})
    description : string 

    @Column({type : "integer" , nullable : true , name : 'number_of_participants'})
    numberOfParticipants : number

    @Column({type : "integer" ,  nullable : true , name : 'number_of_lessons'})
    numberOfLessons : number 

    @Column({type : "float" , default : 5})
    rating : number

    @OneToMany(() => Lesson , lesson => lesson.course , {cascade : true})
    lessons : Lesson[]

    @CreateDateColumn({
        default : 'now()',
        nullable : true,
        name : 'created_at'
    })
    createdAt : Date

    @UpdateDateColumn({
        default : 'now()',
        nullable : true,
        name : 'updated_at'
    })
    updatedAt : Date

    @DeleteDateColumn({name : 'delete_at'})
    deleteAt : Date
}