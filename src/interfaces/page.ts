export interface IPage {
  awaitForSelector(selector: string): Promise<void>;
  reload(): Promise<void>;
  type(content: string, field: string): Promise<void>;
  click(field: string): Promise<void>;
  searchAll(field: string): Promise<Array<any>>;
}
