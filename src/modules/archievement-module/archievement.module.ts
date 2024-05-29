import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

@Module({
    imports : [
        ClientsModule.register(
            [
                {
                    name: 'ARCHIEVEMENT_SERVICE',
                    transport: Transport.KAFKA,
                    options: {
                        client: {
                            brokers: ['localhost:9092']
                        },
                        consumer: {
                            groupId: 'achievement-consumer',
                        },
                    }
                }
            ]
        ),
    ],
    exports : [ClientsModule]
})
export class ArchievementModule {}