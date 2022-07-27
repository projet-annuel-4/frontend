import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import {FeedComponent} from "./post/feed/feed.component";
import {CreateComponent} from "./post/create/create.component";
import {PostDetailComponent} from "./post/post-detail/post-detail.component";
import {CommentComponent} from "./post/comment/comment.component";
import {SearchComponent} from "./post/search/search.component";
import {AuthGuard} from "./_helpers/auth.guard";

import {GroupHomeComponent} from "./group/group-home/group-home.component";
import {GroupProfileComponent} from "./group/group-profile/group-profile.component";
import {ProjectPageComponent} from "./project/project-page/project-page.component";

const routes: Routes = [
  {path: '', canActivate: [AuthGuard], redirectTo:'/profile', pathMatch: 'full'},

  { path: 'group', canActivate: [AuthGuard], component : GroupHomeComponent },
  { path: 'group/:groupId', canActivate: [AuthGuard], component: GroupProfileComponent},
  { path: 'group/:groupId/project/:projectId/branch/:branchId', canActivate: [AuthGuard], component: ProjectPageComponent},

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
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
