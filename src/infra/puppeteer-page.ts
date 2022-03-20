import puppeteer from "puppeteer";

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
}
