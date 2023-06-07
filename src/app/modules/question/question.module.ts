import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { CreateComponent } from './components/create/create.component';
import {FormsModule} from "@angular/forms";
import {QuillModule} from "ngx-quill";
import { IndexComponent } from './components/index/index.component';
import { ViewComponent } from './components/view/view.component';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  declarations: [
    CreateComponent,
    IndexComponent,
    ViewComponent
  ],
    imports: [
        CommonModule,
        QuestionRoutingModule,
        FormsModule,
        QuillModule,
        SharedModule
    ]
})
export class QuestionModule { }
