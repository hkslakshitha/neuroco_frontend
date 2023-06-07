import { Component } from '@angular/core';
import {QuestionService} from "../../services/question.service";
import {Question} from "../../models/question";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  questions: Question[] = [];
  constructor(public questionService : QuestionService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.questionService.findAll().subscribe(res => {
      this.questions = res.results;
    });
  }
}
