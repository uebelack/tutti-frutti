/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'app' })
class App {
  @Field()
    serverTime: Date;

  constructor() {
    this.serverTime = new Date();
  }
}

export default App;
