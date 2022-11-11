import {
  Field, InputType, Int, PartialType,
} from '@nestjs/graphql';
import { CreateWordInput } from './create-word.input';

@InputType()
export class UpdateWordInput extends PartialType(CreateWordInput) {
  @Field(() => Int)
    id: number;
}
