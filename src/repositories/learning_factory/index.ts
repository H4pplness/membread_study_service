import { getLearning } from "./get_learning";
import { setLearning } from "./set_learning";

enum LEARNING {
    VOCABULARY,
    GRAMMAR,
    VIDEO,
}

export class LearningFactory {
    public readonly setLearning = setLearning;

    public readonly getLearning = getLearning;
}