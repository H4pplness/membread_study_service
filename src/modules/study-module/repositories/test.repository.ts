import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { Attribute } from "src/database/entities/attribute.entity";
import { Course } from "src/database/entities/course.entity";
import { CourseProgress } from "src/database/entities/course_progress.entity";
import { Learning } from "src/database/entities/learning.entity";
import { LearningAttribute } from "src/database/entities/learning_attribute.entity";
import { Lesson } from "src/database/entities/lesson.entity";
import { Participant } from "src/database/entities/participant.entity";
import { CreateLessonTestDTO } from "src/dtos/create-lessons/createlessontest.dto";
import { ChooseTestDTO } from "src/dtos/test-lesson/choose_test.dto";
import { ShortAnswerTest } from "src/dtos/test-lesson/short_answer_test.dto";
import { DataSource, Repository } from "typeorm";

export class TestRepository extends Repository<Learning> {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        @InjectRepository(Lesson)
        private readonly lessonRepository: Repository<Lesson>,
        @InjectRepository(Learning)
        private readonly learningRepository: Repository<Learning>,
        @InjectRepository(Attribute)
        private readonly attributeRepository: Repository<Attribute>,
        @InjectRepository(LearningAttribute)
        private readonly learningAttributeRepository: Repository<LearningAttribute>,
        @InjectRepository(CourseProgress)
        private readonly courseProgressRepository: Repository<CourseProgress>,
        @InjectDataSource()
        private dataSource: DataSource,
        @InjectRepository(Participant)
        private readonly participantRepository: Repository<Participant>
    ) {
        super(learningRepository.target, learningRepository.manager, learningRepository.queryRunner);
    }

    async createLesson(createLesson: CreateLessonTestDTO) {
        console.log("COURSE ID :", createLesson.courseId)
        const course = await this.courseRepository.findOne({
            where: { id: createLesson.courseId }
        })

        if (!course) {
            throw new Error("Not found with id = " + createLesson.courseId);
        }

        const lesson = new Lesson();
        lesson.title = createLesson.title;
        lesson.description = createLesson.description;
        lesson.course = course;
        lesson.type = 'test';
        lesson.save();

        const learnings: Learning[] = [];
        const learning_attributes: LearningAttribute[] = [];

        const question_attr = await Attribute.findOne({ where: { attribute_name: 'question' } });
        const choice1_attr = await Attribute.findOne({ where: { attribute_name: 'choice1' } });
        const choice2_attr = await Attribute.findOne({ where: { attribute_name: 'choice2' } });
        const choice3_attr = await Attribute.findOne({ where: { attribute_name: 'choice3' } });
        const choice4_attr = await Attribute.findOne({ where: { attribute_name: 'choice4' } });
        const shortAnswer_attr = await Attribute.findOne({ where: { attribute_name: 'short-answer' } });
        const correctAnswer_attr = await Attribute.findOne({ where: { attribute_name: 'correct-answer' } });

        for (const question of createLesson.listLearning) {
            const learning = new Learning();
            learning.lesson = lesson;
            learning.type = 'test';
            learnings.push(learning);

            console.log("Question : ", question);

            if (question.type == 'short-answer') {
                const shortAnswerTest = Object.assign(new ShortAnswerTest, question);

                const learningQuestion = new LearningAttribute();
                const learningShortAnswer = new LearningAttribute();

                learningQuestion.learning = learning;
                learningQuestion.value = shortAnswerTest.question;
                learningQuestion.attribute = question_attr;

                learningShortAnswer.learning = learning;
                learningShortAnswer.value = shortAnswerTest.shortAnswer;
                learningShortAnswer.attribute = shortAnswer_attr;

                learning_attributes.push(learningQuestion);
                learning_attributes.push(learningShortAnswer);

            }

            if (question.type == 'choose') {
                const chooseTest = Object.assign(new ChooseTestDTO, question)

                const learningQuestion = new LearningAttribute();
                const learningChoose1 = new LearningAttribute();
                const learningChoose2 = new LearningAttribute();
                const learningChoose3 = new LearningAttribute();
                const learningChoose4 = new LearningAttribute();
                const correctAnswer = new LearningAttribute();

                learningQuestion.learning = learning;
                learningQuestion.value = chooseTest.question;
                learningQuestion.attribute = question_attr;

                learningChoose1.learning = learning;
                learningChoose1.value = chooseTest.choice1.content;
                learningChoose1.attribute = choice1_attr;

                learningChoose2.learning = learning;
                learningChoose2.value = chooseTest.choice2.content;
                learningChoose2.attribute = choice2_attr;

                learningChoose3.learning = learning;
                learningChoose3.value = chooseTest.choice3.content;
                learningChoose3.attribute = choice3_attr;

                learningChoose4.learning = learning;
                learningChoose4.value = chooseTest.choice4.content;
                learningChoose4.attribute = choice4_attr;

                correctAnswer.learning = learning;
                correctAnswer.value = ([
                    chooseTest.choice1.isCorrect,
                    chooseTest.choice2.isCorrect, 
                    chooseTest.choice3.isCorrect, 
                    chooseTest.choice4.isCorrect
                ].findIndex((value)=>value)+1).toString();
                correctAnswer.attribute = correctAnswer_attr;

                learning_attributes.push(learningQuestion);
                learning_attributes.push(learningChoose1);
                learning_attributes.push(learningChoose2);
                learning_attributes.push(learningChoose3);
                learning_attributes.push(learningChoose4);
                learning_attributes.push(correctAnswer);
            }
        }

        await this.learningRepository.save(learnings);
        await this.learningAttributeRepository.save(learning_attributes);

        return lesson;
    }
}