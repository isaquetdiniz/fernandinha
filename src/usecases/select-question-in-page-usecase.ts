import { IPage } from "../interfaces/page";
import { SelectQuestionUsecase } from "./select-question-usecase";

const sleep = async (ms: number) =>
  new Promise((resolve, reject) => setTimeout(resolve, ms));
export class SelectQuestionInPageUsecase {
  constructor(private readonly page: IPage) {}

  async execute() {
    await this.page.reload();

    const questions = await this.page.searchAll("tbody > tr");

    if (!questions.length) {
      await sleep(500);
      await this.execute();
    }

    const selectedQuestion = SelectQuestionUsecase.execute(questions);

    if (!selectedQuestion) {
      await sleep(500);
      await this.execute();
    }

    console.log(selectedQuestion);

    await this.page.click(selectedQuestion?.field as string);
  }
}
