import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from "./components/create/create.component";
import { IndexComponent } from './components/index/index.component';
import { ViewComponent } from "./components/view/view.component";

const routes: Routes = [
  { path: '', redirectTo: 'create', pathMatch: 'full'},
  { path: 'create', component: CreateComponent },
  { path: 'index', component: IndexComponent },
  { path: 'view/:questionId', component: ViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionRoutingModule { }
