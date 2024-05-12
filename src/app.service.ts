import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('ARCHIEVEMENT_SERVICE') private readonly archievementClient : ClientKafka
  ){}

  async getHello(hello : string): Promise<string> {
    const result = this.archievementClient.emit('hello.send', hello);
    console.log("RESULT : ",result);
    console.log("HELLO : ",hello);
    return hello;
  }
}
