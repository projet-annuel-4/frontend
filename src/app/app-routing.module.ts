import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import {CodeExecutionComponent} from "./code/code-execution/code-execution.component";
import {ProjectExecutionComponent} from "./code/project-execution/project-execution.component";
import {FeedComponent} from "./post/feed/feed.component";

const routes: Routes = [
  {path: '', redirectTo:'loading', pathMatch: 'full'},
  {
    path: 'execution', children:[
      {path: 'code', component: CodeExecutionComponent},
      {path: 'project', component: ProjectExecutionComponent}
    ]
  },
  {path: 'feed', component: FeedComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
