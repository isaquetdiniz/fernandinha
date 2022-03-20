import { IPage } from "../interfaces/page";
import { SelectQuestionUsecase } from "./select-question-usecase";

export class SelectQuestionInPageUsecase {
  constructor(private readonly page: IPage) {}

  async execute() {
    await this.page.reload();

    const questions = await this.page.searchAll("tbody > tr");

    if (!questions.length) {
      await this.execute();
    }

    const selectedQuestion = SelectQuestionUsecase.execute(questions);

    if (!selectedQuestion) {
      await this.execute();
    }

    await this.page.click(selectedQuestion?.field as string);
  }
}
