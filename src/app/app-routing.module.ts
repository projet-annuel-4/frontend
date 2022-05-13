import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import {CodeExecutionComponent} from "./code-execution/code-execution.component";

const routes: Routes = [
  {path: '', redirectTo:'loading', pathMatch: 'full'},
  {path: 'code_execution', component: CodeExecutionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
