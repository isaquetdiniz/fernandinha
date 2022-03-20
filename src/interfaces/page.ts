import { Question } from "domain/question";

export interface IPage {
  awaitForSelector(selector: string): Promise<void>;
  reload(): Promise<void>;
  type(content: string, field: string): Promise<void>;
  click(field: string): Promise<void>;
  searchQuestions(field: string): Promise<Array<Question>>;
  goto(link: string): Promise<void>;
}
