import {Component} from '@angular/core';
import {Question} from "../../models/question";
import {QuestionService} from "../../services/question.service";
import {ActivatedRoute} from "@angular/router";
import {CalendarSettingType} from "../../enums/calendar-setting-type";
import {QuestionDataEntryOptionAnswer} from "../../../question-data-entry-option-answer/models/question-data-entry-option-answer";
import {QuestionDataEntryOptionAnswerService} from "../../../question-data-entry-option-answer/services/question-data-entry-option-answer.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  id!: string;
  questionDataEntryOptionAnswerId!: string;
  question: Question = new Question();
  isDisabled: boolean = true;
  months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  protected readonly CalendarSettingType = CalendarSettingType;

  constructor(public questionService : QuestionService,
              public questionDataEntryOptionAnswerService : QuestionDataEntryOptionAnswerService,
              private toastrService: ToastrService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['questionId'];
    this.loadData();
  }

  loadData(): void {
    this.questionService.find(this.id).subscribe((data: any) => {
      this.question = data.results;

      this.question.questionDataEntryOptions.forEach((option: any) => {
        option.years = [];
        for (let i = 1900; i <= 2500; i++) {
          option.years.push(i);
        }

        option.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        option.year = new Date().getFullYear();
        option.month = option.months[new Date().getMonth()];
        option.day = new Date().getDate();
        option.time = new Date().getHours().toString().padStart(2, '0') + ":" + new Date().getMinutes().toString().padStart(2, '0');

        const daysInMonth = new Date(option.year, option.months.indexOf(option.month) + 1, 0).getDate();

        option.days = [];
        for (let i = 1; i <= daysInMonth; i++) {
          option.days.push(i);
        }
      });
    });
  }

  updateDays(index: number): void {
    const daysInMonth = new Date(this.question.questionDataEntryOptions[index].year, this.question.questionDataEntryOptions[index].months.indexOf(this.question.questionDataEntryOptions[index].month) + 1, 0).getDate();
    this.question.questionDataEntryOptions[index].days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      this.question.questionDataEntryOptions[index].days.push(i);
    }
  }

  onYearChange(index: number): void {
    // Update the days when the year changes
    this.updateDays(index);
  }

  onMonthChange(index: number): void {
    // Update the days when the month changes
    this.updateDays(index);
    this.question.questionDataEntryOptions[index].day = 1;
  }

  save = (form: any, index: number) => {
    let questionDataEntryOption = this.question.questionDataEntryOptions[index];
    let questionDataEntryOptionAnswer = new QuestionDataEntryOptionAnswer();
    questionDataEntryOptionAnswer.questionId = questionDataEntryOption.questionId;
    questionDataEntryOptionAnswer.questionDataEntryOptionId = questionDataEntryOption.id;
    questionDataEntryOptionAnswer.answer = form.value.answer;

    let year = "";
    let month = "";
    let day = "";

    if (form.value.year !== undefined) {
      year = form.value.year.toString();
      questionDataEntryOptionAnswer.date = year;
    }

    if (form.value.month !== undefined) {
      month = (this.months.indexOf(form.value.month) + 1).toString();
      questionDataEntryOptionAnswer.date !== undefined ? questionDataEntryOptionAnswer.date += "-" + month.padStart(2, '0') : questionDataEntryOptionAnswer.date = month.padStart(2, '0');
    }

    if (form.value.day !== undefined) {
      day = form.value.day.toString();
      questionDataEntryOptionAnswer.date !== undefined ? questionDataEntryOptionAnswer.date += "-" + day.padStart(2, '0') : questionDataEntryOptionAnswer.date = day.padStart(2, '0');
    }

    questionDataEntryOptionAnswer.time = form.value.time;

    this.questionDataEntryOptionAnswerService.create(questionDataEntryOptionAnswer).subscribe(res => {
      if (res.status === 'SUCCESS') {
        this.toastrService.success('Question data entry option answer created successfully!', '', {
          progressBar: true,
        });
        this.loadData();
      } else {
        this.toastrService.error('Question data entry option answer create failed!', '', {
          progressBar: true,
        });
      }
    });
  }

  openDeleteModal(questionDataEntryOptionAnswerId: string) {
    this.questionDataEntryOptionAnswerId = questionDataEntryOptionAnswerId;
  }

  onYesDeleteClicked() {
    this.questionDataEntryOptionAnswerService.delete(this.questionDataEntryOptionAnswerId).subscribe(res => {
      if (res.status === 'SUCCESS') {
        this.toastrService.success('Question data entry option answer deleted successfully!', '', {
          progressBar: true,
        });
        this.loadData();
      } else {
        this.toastrService.error('Question data entry option answer delete failed!', '', {
          progressBar: true,
        });
      }
    });
  }

  onNoDeleteClicked() {}
}
