import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const kafkaMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'membread-study-service',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'study-consumer',
        },
      },
    })

    await kafkaMicroservice.listen();

    // // Tạo HTTP server để cung cấp API cho client
    // const app = await NestFactory.create(AppModule);
    // await app.listen(3000); 
}
bootstrap();
