import { Component } from '@angular/core';
import {QuestionService} from "../../services/question.service";
import {Question} from "../../models/question";
import {QuestionDataEntryOption} from "../../models/question-data-entry-option";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  quillConfig={
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        //[{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['clean'],                                         // remove formatting button
        ['link', 'image', 'video']                         // link and image, video
      ],
    }
  }

  question: Question = new Question();

  constructor(public questionService : QuestionService, private toastrService: ToastrService) {
  }

  generatePanels() {
    this.question.numberOfOption++;
    this.question.questionDataEntryOptions.push(new QuestionDataEntryOption());
  }

  removePanel(index: number) {
    this.question.numberOfOption--;
    this.question.questionDataEntryOptions.splice(index, 1);
  }

  moveUp(index: number) {
    if (index > 0) {
      const [divItem] = this.question.questionDataEntryOptions.splice(index, 1);
      this.question.questionDataEntryOptions.splice(index - 1, 0, divItem);
    }
  }

  moveDown(index: number) {
    if (index < this.question.questionDataEntryOptions.length - 1) {
      const [divItem] = this.question.questionDataEntryOptions.splice(index, 1);
      this.question.questionDataEntryOptions.splice(index + 1, 0, divItem);
    }
  }

  submit = () =>{
    this.questionService.create(this.question).subscribe(res => {
      if (res.status === 'SUCCESS') {
        this.toastrService.success('Question created successfully!', '', {
          progressBar: true,
        });
        this.question = new Question();
      } else {
        this.toastrService.error('Question created failed!', '', {
          progressBar: true,
        });
      }
    });
  }
}
