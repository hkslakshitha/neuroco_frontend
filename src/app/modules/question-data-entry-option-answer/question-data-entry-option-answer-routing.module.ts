import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from "./components/edit/edit.component";

const routes: Routes = [
  { path: 'edit/:questionDataEntryOptionAnswerId', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionDataEntryOptionAnswerRoutingModule { }
