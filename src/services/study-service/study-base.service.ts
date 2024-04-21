export interface StudyBaseService<T> {
    getLesson(lesson_id : number) : T[];

    getProgress(lesson_id : number) : number;

    study() : T[];

    setGoal() : number;
}