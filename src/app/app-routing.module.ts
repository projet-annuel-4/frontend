import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import {CodeExecutionComponent} from "./code/code-execution/code-execution.component";
import {ProjectExecutionComponent} from "./code/project-execution/project-execution.component";
import {FeedComponent} from "./post/feed/feed.component";
import {CreateComponent} from "./post/create/create.component";
import {PostDetailComponent} from "./post/post-detail/post-detail.component";
import {CommentComponent} from "./post/comment/comment.component";
import {SearchComponent} from "./post/search/search.component";
import {AuthGuard} from "./_helpers/auth.guard";

const routes: Routes = [
  //{path: '', pathMatch: 'full', canActivate: [AuthGuard]},

  {
    path: 'execution', canActivate: [AuthGuard], children:[
      {path: 'code', component: CodeExecutionComponent},
      {path: 'project', component: ProjectExecutionComponent}
    ]
  },
  {
    path: 'post', canActivate: [AuthGuard], children:[
      {path: 'feed', component: FeedComponent},
      {path: 'create', component: CreateComponent},
      {path: 'search', component: SearchComponent},

      {path: ':postId', children:[
          {path: 'detail', component: PostDetailComponent},
          {path: 'comment', component: CommentComponent},
        ]},
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
