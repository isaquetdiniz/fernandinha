import { LoginInWebPageUsecase } from "./usecases/login-in-web-page-usecase";
import { PuppeteerBrowser } from "./infra/puppeteer-browser";
import { OpenWebPageUsecase } from "./usecases/open-web-page-usecase";

const link =
  "https://online.academiafernandinhobeltrao.com.br/online/portal2021/administrativo/";

const username = "274";
const password = "159753";

const usernameField = "#usuario";
const passwordField = "#senha";
const buttonToLogin = "button[type=submit]";

async function main() {
  const browser = new PuppeteerBrowser();

  const page = await new OpenWebPageUsecase(link, browser).execute();

  await new LoginInWebPageUsecase(page).execute(
    username,
    password,
    usernameField,
    passwordField,
    buttonToLogin
  );
}

main();
