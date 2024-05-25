import { LearningType } from "../entities/learning_type.entity";

export enum LEARNING_TYPE {
    VOCABULARY,
    GRAMMAR
}

export enum ATTRIBUTE {
    NONE,
    VOCABULARY = 1,
    MEANING = 2,
    GRAMMAR = 3,
    EXPLAINATION = 4,
    EXAMPLE,
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


export async function getAttributeLearning(learning_type : LEARNING_TYPE){
    switch(learning_type)
    {
        case LEARNING_TYPE.VOCABULARY:
            return [
                ATTRIBUTE.VOCABULARY,
                ATTRIBUTE.MEANING,
            ];
        case LEARNING_TYPE.GRAMMAR:
            return [
                ATTRIBUTE.GRAMMAR,
                ATTRIBUTE.EXPLAINATION,
                ATTRIBUTE.EXAMPLE
            ];
    }
}