import { SetupCourseModule } from './modules/setup-course-module/setup-course.module';
import { StudyModule } from './modules/study-module/study.module';
import { ConfigModule } from './config/config.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonRepository } from './repositories/lesson.repository';
import { Course } from './database/entities/course.entity';
import { Learning } from './database/entities/learning.entity';
import { Lesson } from './database/entities/lesson.entity';
import { Attribute } from './database/entities/attribute.entity';
import { LearningAttribute } from './database/entities/learning_attribute.entity';
import { CourseProgress } from './database/entities/course_progress.entity';
import { Participant } from './database/entities/participant.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ArchievementModule } from './modules/archievement-module/archievement.module';


@Module({
  imports: [
    SetupCourseModule,
    StudyModule,
    ConfigModule,
    ArchievementModule,
    ClientsModule.register(
      [
          {
              name: 'USER_SERVICE',
              transport: Transport.KAFKA,
              options: {
                  client: {
                      brokers: ['localhost:9092']
                  },
                  consumer: {
                      groupId: 'user-consumer',
                  },
              },
              
          },
      ]
  ),
    TypeOrmModule.forFeature([Course, Learning, Lesson, Attribute, LearningAttribute, CourseProgress, Participant]),
  ],
  controllers: [
    AppController,
  ],
  providers: [AppService, LessonRepository],
})
export class AppModule { }
