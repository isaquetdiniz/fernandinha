export class Question {
  author: string;
  subject?: string;
  field: string;

  constructor(author: string, subject: string, field: string) {
    this.author = author;
    this.subject = subject || undefined;
    this.field = field;
  }
}
