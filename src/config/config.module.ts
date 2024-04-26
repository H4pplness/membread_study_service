/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '12345678',
            database: 'membread-study-db',
            entities: ['dist/database/entities/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        ClientsModule.register(
            [
                {
                    name: 'USER_SERVICE',
                    transport: Transport.KAFKA,
                    options: {
                        client: {
                            brokers: ['locahost:9092']
                        }
                    }
                },
                {
                    name: 'ACHIEVEMENT_SERVICE',
                    transport: Transport.KAFKA,
                    options: {
                        client: {
                            brokers: ['locahost:9092']
                        }
                    }
                }
            ]
        )
    ],
    controllers: [],
    providers: [],
})
export class ConfigModule { }
