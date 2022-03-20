import { Question } from "../domain/question";

export class SelectQuestionUsecase {
  static execute(questions: Array<Question>): Question | null {
    const filteredQuestions = questions.filter(
      (question) => question.author !== "FERNANDO BELTRÃO"
    );

    if (!filteredQuestions.length) {
      return null;
    }

    const selectedQuestion = filteredQuestions[0];

    return selectedQuestion;
  }
}
