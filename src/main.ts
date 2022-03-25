import { OpenWebPageUsecase } from "./usecases/open-web-page-usecase";
import { SelectQuestionInPageUsecase } from "./usecases/select-question-in-page-usecase";
import { LoginInWebPageUsecase } from "./usecases/login-in-web-page-usecase";
import { PuppeteerBrowser } from "./infra/puppeteer-browser";
import { PlaySoundSpeaker } from "./infra/play-sound-speaker";

import { environment } from "./config";

const {
  link,
  username,
  password,
  usernameField,
  passwordField,
  buttonToLogin,
  questionsPageField,
} = environment;

async function main() {
  console.log("[ENV]", environment);

  const browser = new PuppeteerBrowser();
  const speaker = new PlaySoundSpeaker();

  const page = await new OpenWebPageUsecase(link, browser).execute();

  await new LoginInWebPageUsecase(page).execute(
    username,
    password,
    usernameField,
    passwordField,
    buttonToLogin
  );

  page.awaitForSelector(questionsPageField);

  await page.click(questionsPageField);

  await new SelectQuestionInPageUsecase(page, speaker).execute();
}

main();
