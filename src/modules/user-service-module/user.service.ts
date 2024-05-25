import { Inject, Injectable } from "@nestjs/common";
import { ClientKafka, MessagePattern } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class UserService {
    constructor(@Inject('USER_SERVICE') private readonly kafkaClient : ClientKafka) {}
    
    async onModuleInit() {
        this.kafkaClient.subscribeToResponseOf('get-user-info');
        await this.kafkaClient.connect();
    }

    async getUserInfo(userId : string)
    {
        console.log('USERID :' ,userId);
        return await lastValueFrom(this.kafkaClient.send('get-user-info',{userId : userId}));
    }
}