import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'question', pathMatch: 'full'},
  { path: 'question', loadChildren: () => import('./modules/question/question.module').then(m => m.QuestionModule) },
  { path: 'question_data_entry_option_answer', loadChildren: () => import('./modules/question-data-entry-option-answer/question-data-entry-option-answer.module').then(m => m.QuestionDataEntryOptionAnswerModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
