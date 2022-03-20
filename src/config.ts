import "dotenv/config";

export const environment = {
  link: process.env.PAGE_LINK as string,
  username: process.env.USERNAME as string,
  password: process.env.PASSWORD as string,
  usernameField: process.env.USERNAME_FIELD as string,
  passwordField: process.env.PASSWORD_FIELD as string,
  buttonToLogin: process.env.BUTTON_LOGIN_FIELD as string,
  questionsPageLink: process.env.QUESTIONS_PAGE_FIELD as string,
  timeOfReloadInMs: process.env.TIME_OF_RELOAD_IN_MS
    ? parseInt(process.env.TIME_OF_RELOAD_IN_MS)
    : 500,
};
