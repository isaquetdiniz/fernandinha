import { PuppeteerBrowser } from "./infra/puppeteer-browser";
import { OpenWebPageUsecase } from "./usecases/open-web-page-usecase";

async function main() {
  const link =
    "https://online.academiafernandinhobeltrao.com.br/online/portal2021/administrativo/";

  const browser = new PuppeteerBrowser();

  await new OpenWebPageUsecase(link, browser).execute();
}

main();
