import { IBrowser } from "../interfaces/browser";

export class OpenWebPageUsecase {
  constructor(
    private readonly link: string,
    private readonly browser: IBrowser
  ) {}

  async execute() {
    await this.browser.openPage(this.link);
  }
}
