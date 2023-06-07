import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionDataEntryOptionAnswerRoutingModule } from './question-data-entry-option-answer-routing.module';
import { EditComponent } from './components/edit/edit.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    EditComponent
  ],
    imports: [
        CommonModule,
        QuestionDataEntryOptionAnswerRoutingModule,
        FormsModule
    ]
})
export class QuestionDataEntryOptionAnswerModule { }
