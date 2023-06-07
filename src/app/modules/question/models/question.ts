import {QuestionDataEntryOption} from "./question-data-entry-option";

export class Question {
  id!: string;
  question: string = null!;
  numberOfOption: number = 0;
  isCompulsory: boolean = false;
  createdTime!: Date;
  questionDataEntryOptions: QuestionDataEntryOption[] = [];
}
