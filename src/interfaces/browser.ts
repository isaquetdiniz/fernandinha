import { IPage } from "./page";

export interface IBrowser {
  openPage(link: string): Promise<IPage>;
}
