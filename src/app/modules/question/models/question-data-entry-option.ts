import {TextAnswerSettingType} from "../enums/text-answer-setting-type";
import {CalendarSettingType} from "../enums/calendar-setting-type";
import {QuestionDataEntryOptionAnswer} from "../../question-data-entry-option-answer/models/question-data-entry-option-answer";

export class QuestionDataEntryOption {
  id!: string;
  questionId!: string;
  name: string = null!;
  hasTextInput: boolean = true;
  textInputTitle: string = null!;
  textAnswerSettingType: TextAnswerSettingType = TextAnswerSettingType.UNLIMITED;
  textAnswerSettingValue: string = '0';
  hasCalendarInput: boolean = true;
  calendarSettingType: CalendarSettingType = CalendarSettingType.DATE_MONTH_AND_YEAR_ONLY;
  hasTimeInput: boolean = true;
  answer: string = null!;
  years: number[] = [];
  months: string[] = [];
  days: number[] = [];
  year!: number;
  month!: string;
  day!: number;
  time!: string;
  questionDataEntryOptionAnswers: QuestionDataEntryOptionAnswer[] = [];
}
