import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import {CodeExecutionComponent} from "./code/code-execution/code-execution.component";
import {ProjectExecutionComponent} from "./code/project-execution/project-execution.component";
import {FeedComponent} from "./post/feed/feed.component";
import {CreateComponent} from "./post/create/create.component";

const routes: Routes = [
  {path: '', redirectTo:'loading', pathMatch: 'full'},
  {
    path: 'execution', children:[
      {path: 'code', component: CodeExecutionComponent},
      {path: 'project', component: ProjectExecutionComponent}
    ]
  },
  {
    path: 'post', children:[
      {path: 'feed', component: FeedComponent},
      {path: 'create', component: CreateComponent},
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
