export interface IBrowser {
  openPage(link: string): Promise<void>;
}
