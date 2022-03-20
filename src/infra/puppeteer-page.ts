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

  async searchAll(field: string): Promise<any[]> {
    const questions = await this.page.$$eval(field, (trs) =>
      trs.map((tr) => {
        const children = [...tr.children];

        const childrenContents = children.map((td) => td.innerHTML);

        const author = childrenContents[3];

        const subject = childrenContents[4];

        const field = childrenContents[10];

        const newQuestion = new Question(author, subject, field);

        return newQuestion;
      })
    );

    return questions;
  }
}
