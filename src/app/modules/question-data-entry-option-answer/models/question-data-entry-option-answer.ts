import {QuestionDataEntryOption} from "../../question/models/question-data-entry-option";

export class QuestionDataEntryOptionAnswer {
  id!: string;
  questionId!: string;
  questionDataEntryOptionId!: string;
  answer: string = null!;
  date!: string;
  time!: string;
  createdTime!: Date;
  questionDataEntryOption!: QuestionDataEntryOption;
}
