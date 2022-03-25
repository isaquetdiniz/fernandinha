import { environment } from "../config";

const { questionPageLink } = environment;
export class Question {
  code: string;
  author: string;
  subject?: string;
  link: string;

  constructor(
    code: string,
    author: string,
    subject: string,
    partialLink: string
  ) {
    this.code = code;
    this.author = author;
    this.subject = subject || undefined;
    this.link = `${questionPageLink}${partialLink}`;
  }
}
