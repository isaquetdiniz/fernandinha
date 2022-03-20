import { IBrowser } from "../interfaces/browser";

export class OpenWebPageUsecase {
  constructor(
    private readonly link: string,
    private readonly browser: IBrowser
  ) {}

  async execute() {
    const page = await this.browser.openPage(this.link);
    return page;
  }
}
