enum LEARNING_TYPE
{
    VOCABULARY,
    VIDEO,
    GRAMMAR,
}

export class LearningDTO {
    id? : number;

    type? : LEARNING_TYPE;
    
    lesson_id? : number;
}