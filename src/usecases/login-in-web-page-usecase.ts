import { IPage } from "../interfaces/page";

export class LoginInWebPageUsecase {
  constructor(private readonly page: IPage) {}

  async execute(
    username: string,
    password: string,
    usernameField: string,
    passwordField: string,
    buttonToLogin: string
  ) {
    await this.page.type(username, usernameField);
    await this.page.type(password, passwordField);

    await this.page.click(buttonToLogin);
  }
}
