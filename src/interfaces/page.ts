export interface IPage {
  type(content: string, field: string): Promise<void>;
  click(field: string): Promise<void>;
}
