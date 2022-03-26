import puppeteer from "puppeteer";
import { Question } from "../domain/question";
import { IPage } from "../interfaces/page";

export class PuppeteerPage implements IPage {
  constructor(private readonly page: puppeteer.Page) {}

  async awaitForSelector(selector: string): Promise<void> {
    await this.page.waitForSelector(selector);
  }

  async type(content: string, field: string): Promise<void> {
    await this.awaitForSelector(field);
    await this.page.type(field, content);
  }

  async click(field: string): Promise<void> {
    await this.awaitForSelector(field);
    await this.page.click(field);
  }

  async reload(): Promise<void> {
    this.page.reload();
  }

  async searchQuestions(field: string): Promise<Question[]> {
    try {
      await this.awaitForSelector("tbody");

      const tableExists = await this.page.$("tbody");

      if (!tableExists) {
        return [];
      }

      const tableHasLines = await tableExists.evaluate(
        (table) => table.children
      );

      if (!Object.keys(tableHasLines).length) {
        console.log("Questões não foram achadas");
        return [];
      }

      console.log("Questões foram achadas");

      const tableLines = await this.page.$$(field);

      const questions = await Promise.all(
        [...tableLines].map(async (tr) => {
          const textOfTr = await tr.evaluate((tr) => tr.innerHTML);

          const textWithoutTdStart = textOfTr.replace(/<td>/gim, "");
          const textWithoutTdEnd = textWithoutTdStart.replace(/<\/td>/gim, "");

          const listOfTexts = textWithoutTdEnd.split("\n");

          console.log(listOfTexts);

          const code = listOfTexts[1];

          const author = listOfTexts[4];

          const subject = listOfTexts[5];

          const textOfLink = listOfTexts[14] || listOfTexts[15] || listOfTexts[16];

          const partialLink = textOfLink.match(/".+td=."/)
            ? //@ts-ignore
              textOfLink
                .match(/".+td=."/)[0]
                .replace(/"/gim, "")
                .replace(/amp;/gim, "")
            : "Não encontrei";

          const newQuestion = new Question(code, author, subject, partialLink);

          return newQuestion;
        })
      );

      return questions;
    } catch (err) {
      console.log(err);
      return [];
    }
  }

  async goto(link: string): Promise<void> {
    await this.page.goto(link);
  }
}
