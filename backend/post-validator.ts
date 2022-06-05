import {Length} from 'class-validator';
export class Post{
  @Length(5, 50)
  title!: string;

  @Length(10, 500)
  body!: string
}
