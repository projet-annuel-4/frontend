import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import {CodeExecutionComponent} from "./code/code-execution/code-execution.component";
import {ProjectExecutionComponent} from "./code/project-execution/project-execution.component";
import {FeedComponent} from "./post/feed/feed.component";
import {CreateComponent} from "./post/create/create.component";
import {PostDetailComponent} from "./post/post-detail/post-detail.component";
import {CommentComponent} from "./post/comment/comment.component";
import {SearchComponent} from "./post/search/search.component";
import {GroupHomeComponent} from "./group/group-home/group-home.component";
import {GroupProfileComponent} from "./group/group-profile/group-profile.component";
import {ProjectPageComponent} from "./project/project-page/project-page.component";

const routes: Routes = [
  {path: '', redirectTo:'auth/signing', pathMatch: 'full'},

  { path: 'group', component : GroupHomeComponent },
  { path: 'group/:groupId', component: GroupProfileComponent},
  { path: 'group/:groupId/project/:projectId/branch/:branchId', component: ProjectPageComponent},
  {
    path: 'post', children:[
      {path: 'feed', component: FeedComponent},
      {path: 'create', component: CreateComponent},
      {path: 'search', component: SearchComponent},// --> TODO : Test à supprimer

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
