import { Component } from '@angular/core';
import {QuestionDataEntryOptionAnswer} from "../../models/question-data-entry-option-answer";
import {QuestionDataEntryOptionAnswerService} from "../../services/question-data-entry-option-answer.service";
import {ActivatedRoute} from "@angular/router";
import {CalendarSettingType} from "../../../question/enums/calendar-setting-type";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  id!: string;
  questionDataEntryOptionAnswer = new QuestionDataEntryOptionAnswer();
  protected readonly CalendarSettingType = CalendarSettingType;

  constructor(public questionDataEntryOptionAnswerService : QuestionDataEntryOptionAnswerService,
              private toastrService: ToastrService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['questionDataEntryOptionAnswerId'];
    this.questionDataEntryOptionAnswerService.find(this.id).subscribe((data: any) => {
      this.questionDataEntryOptionAnswer = data.results;
      console.log(this.questionDataEntryOptionAnswer);

      this.questionDataEntryOptionAnswer.questionDataEntryOption.years = [];
      for (let i = 1900; i <= 2500; i++) {
        this.questionDataEntryOptionAnswer.questionDataEntryOption.years.push(i);
      }

      this.questionDataEntryOptionAnswer.questionDataEntryOption.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      this.questionDataEntryOptionAnswer.questionDataEntryOption.year = this.questionDataEntryOptionAnswer.date.split('-').length > 0 ? parseInt(this.questionDataEntryOptionAnswer.date.split('-')[0]) : new Date().getFullYear();
      this.questionDataEntryOptionAnswer.questionDataEntryOption.month = this.questionDataEntryOptionAnswer.date.split('-').length > 1 ? this.questionDataEntryOptionAnswer.questionDataEntryOption.months[parseInt(this.questionDataEntryOptionAnswer.date.split('-')[1]) - 1] : this.questionDataEntryOptionAnswer.questionDataEntryOption.months[new Date().getMonth()];
      this.questionDataEntryOptionAnswer.questionDataEntryOption.day = this.questionDataEntryOptionAnswer.date.split('-').length > 2 ? parseInt(this.questionDataEntryOptionAnswer.date.split('-')[2]) : new Date().getDate();
      this.questionDataEntryOptionAnswer.questionDataEntryOption.time = this.questionDataEntryOptionAnswer.time;

      const daysInMonth = new Date(this.questionDataEntryOptionAnswer.questionDataEntryOption.year, this.questionDataEntryOptionAnswer.questionDataEntryOption.months.indexOf(this.questionDataEntryOptionAnswer.questionDataEntryOption.month) + 1, 0).getDate();

      this.questionDataEntryOptionAnswer.questionDataEntryOption.days = [];
      for (let i = 1; i <= daysInMonth; i++) {
        this.questionDataEntryOptionAnswer.questionDataEntryOption.days.push(i);
      }
    });
  }

  updateDays(): void {
    const daysInMonth = new Date(this.questionDataEntryOptionAnswer.questionDataEntryOption.year, this.questionDataEntryOptionAnswer.questionDataEntryOption.months.indexOf(this.questionDataEntryOptionAnswer.questionDataEntryOption.month) + 1, 0).getDate();
    this.questionDataEntryOptionAnswer.questionDataEntryOption.days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      this.questionDataEntryOptionAnswer.questionDataEntryOption.days.push(i);
    }
  }

  onYearChange(): void {
    // Update the days when the year changes
    this.updateDays();
  }

  onMonthChange(): void {
    // Update the days when the month changes
    this.updateDays();
    this.questionDataEntryOptionAnswer.questionDataEntryOption.day = 1;
  }

  submit(form: any): void {
    console.log(form.value);
    this.questionDataEntryOptionAnswer.answer = form.value.answer;

    let year = "";
    let month = "";
    let day = "";

    if (form.value.year !== undefined) {
      year = form.value.year.toString();
      this.questionDataEntryOptionAnswer.date = year;
    }

    if (form.value.month !== undefined) {
      month = (this.questionDataEntryOptionAnswer.questionDataEntryOption.months.indexOf(form.value.month) + 1).toString();
      this.questionDataEntryOptionAnswer.date !== undefined ? this.questionDataEntryOptionAnswer.date += "-" + month.padStart(2, '0') : this.questionDataEntryOptionAnswer.date = month.padStart(2, '0');
    }

    if (form.value.day !== undefined) {
      day = form.value.day.toString();
      this.questionDataEntryOptionAnswer.date !== undefined ? this.questionDataEntryOptionAnswer.date += "-" + day.padStart(2, '0') : this.questionDataEntryOptionAnswer.date = day.padStart(2, '0');
    }

    this.questionDataEntryOptionAnswer.time = form.value.time;

    this.questionDataEntryOptionAnswerService.update(this.questionDataEntryOptionAnswer).subscribe((res: any) => {
      if (res.status === 'SUCCESS') {
        this.toastrService.success('Question data entry option answer update successfully!', '', {
          progressBar: true,
        });
      } else {
        this.toastrService.error('Question data entry option answer update failed!', '', {
          progressBar: true,
        });
      }
    });
  }
}
