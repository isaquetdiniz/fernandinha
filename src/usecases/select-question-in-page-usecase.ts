import { ISpeaker } from "interfaces/speaker";
import { IPage } from "../interfaces/page";
import { SelectQuestionUsecase } from "./select-question-usecase";

const sleep = async (ms: number) =>
  new Promise((resolve, reject) => setTimeout(resolve, ms));
export class SelectQuestionInPageUsecase {
  constructor(
    private readonly page: IPage,
    private readonly speaker: ISpeaker
  ) {}

  async execute() {
    await this.page.reload();

    const questions = await this.page.searchQuestions("tbody > tr");

    if (!questions.length) {
      await sleep(500);
      await this.execute();
    }

    const selectedQuestion = SelectQuestionUsecase.execute(questions);

    if (!selectedQuestion) {
      await sleep(500);
      await this.execute();
    }

    console.log("Questão selecionada", selectedQuestion);

    await this.page.click("a.btn.btn-primary");

    this.speaker.play();

    return;
  }
}
