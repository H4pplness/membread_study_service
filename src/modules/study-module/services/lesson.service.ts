import { Injectable, NotFoundException } from "@nestjs/common";
import { LessonRepository } from "../repositories/lesson.repository";
import { LessonInfo } from "src/dtos/lessoninfo.dto";
import { Repository } from "typeorm";
import { Course } from "src/database/entities/course.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ParticipantRepository } from "../repositories/participant.repository";
import { UserService } from "src/modules/user-service-module/user.service";

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>,
        private readonly lessonRepository: LessonRepository,
        private readonly participantRepository: ParticipantRepository,
        private readonly userService: UserService
    ) { }

    public async getCourseInfo(userId: string, courseId: number) {
        let courseInfo: any = {};
        const course = await this.courseRepository.findOne({ where: { id: courseId } });

        if (!course) {
            throw new NotFoundException();
        }

        courseInfo.title = course.title;
        courseInfo.description = course.description;
        // courseInfo.authorId = course.authorId;

        const listLesson = await this.lessonRepository.getLessonByCourseId(courseId);
        const lessonsOfCourse = listLesson.map((lesson) => {
            let lessonInfo = new LessonInfo();
            lessonInfo.id = lesson.id;
            lessonInfo.courseId = courseId;
            lessonInfo.description = lesson.description;
            lessonInfo.title = lesson.title;
            lessonInfo.type = lesson.type;
            return lessonInfo;
        });

        const currentLesson = await this.participantRepository.findOne({
            where: {
                participant_id: userId,
                course_id: courseId
            }
        });

        if (!currentLesson) {
            courseInfo.currentLesson = listLesson[0]!.id;
        } else {
            if (currentLesson.can_study != null) {
                courseInfo.currentLesson = currentLesson.currentLesson;
            } else {
                courseInfo.currentLesson = listLesson[0]!.id;
            }
        }

        courseInfo.listLesson = lessonsOfCourse;

        courseInfo.author = await this.userService.getUserInfo(course.authorId);

        return courseInfo;
    }

    public async getLearningCourse(userId: string) {
        return await this.lessonRepository.getUserLearningLesson(userId);
    }

    public async getTeachingCourse(userId: string) {
        return await this.lessonRepository.getTeachingCourse(userId);
    }

    public async selectLesson(userId: number, lessonId: number, course: number) {

    }
}