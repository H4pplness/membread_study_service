import { CourseServiceModule } from './services/course-service/course-service.module';
import { RepositoriesModule } from './repositories/repositories.module';
import { StudyServiceModule } from './services/study-service/study-service.module';
import { CourseController } from './controllers/course.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    CourseServiceModule,
    RepositoriesModule,
    StudyServiceModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345678',
      database: 'membread-study-db',
      entities: ['dist/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ClientsModule.register(
      [
        {
          name : 'USER_SERVICE',
          transport : Transport.KAFKA,
          options : {
            client : {
              brokers : ['locahost:9092']
            }
          }
        },
        {
          name : 'ACHIEVEMENT_SERVICE',
          transport : Transport.KAFKA,
          options : {
            client : {
              brokers : ['locahost:9092']
            }
          }
        }
      ]
    )
  ],
  controllers: [
    AppController],
  providers: [AppService],
})
export class AppModule { }
