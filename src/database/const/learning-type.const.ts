import { LearningType } from "../entities/learning_type.entity";

export enum LEARNING_TYPE {
    VOCABULARY,
    GRAMMAR
}

export async function getLearningType(learning_type : LEARNING_TYPE) :Promise<LearningType>
{
    switch(learning_type)
    {
        case LEARNING_TYPE.VOCABULARY:
            return await LearningType.findOne({where : {id : 1}});
        case LEARNING_TYPE.GRAMMAR:
            return await LearningType.findOne({where : {id : 2}});
        default:
            return await LearningType.findOne({where : {id : 1}});
    }
}