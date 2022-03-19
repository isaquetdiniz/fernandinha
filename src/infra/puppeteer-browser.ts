import puppeteer from "puppeteer";
import { IBrowser } from "../interfaces/browser";

export class PuppeteerBrowser implements IBrowser {
  browser?: puppeteer.Browser;

  constructor() {
    this.launchBrowser();
  }

  async launchBrowser(): Promise<void> {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: false,
        ignoreDefaultArgs: ["--disable-extensions"],
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
        ],
      });
    }
  }

  async openPage(link: string): Promise<void> {
    const page = await this.browser?.newPage();

    await page?.goto(link);
  }
}
