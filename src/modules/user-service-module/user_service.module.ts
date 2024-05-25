import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { UserService } from "./user.service";

@Module({
    imports : [
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
                    }
                }
            ]
        ),
    ],
    providers: [UserService],
    exports : [ClientsModule,UserService]
})
export class UserServiceModule {}