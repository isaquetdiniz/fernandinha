import puppeteer from "puppeteer";

import { IPage } from "../interfaces/page";
import { IBrowser } from "../interfaces/browser";
import { PuppeteerPage } from "./puppeteer-page";

export class PuppeteerBrowser implements IBrowser {
  browser?: puppeteer.Browser;

  constructor() {}

  async launchBrowser(): Promise<puppeteer.Browser> {
    if (!this.browser) {
      const browser = await puppeteer.launch({
        headless: false,
      });

      return browser;
    }

    return this.browser;
  }

  async openPage(link: string): Promise<IPage> {
    this.browser = await this.launchBrowser();

    const context = this.browser.defaultBrowserContext();

    await context.overridePermissions(
      "https://online.academiafernandinhobeltrao.com.br",
      ["geolocation"]
    );

    const page = await this.browser.newPage();

    await page.goto(link);

    await page.setGeolocation({ latitude: -8.0085708, longitude: -34.9691491 });

    const newPage = new PuppeteerPage(page);

    return newPage;
  }
}
