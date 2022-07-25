import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { ChatComponent } from './chat/chat.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import { ChatBannerComponent } from './chat-banner/chat-banner.component';
import { ProfileComponent } from './profile/profile.component';
import {ProfileUpdateComponent} from "./profile-update/profile-update.component";
import {FriendProfileComponent} from "./profile/friend-profile/friend-profile.component";

const routes: Routes = [
  {path: '', redirectTo:'profile', pathMatch: 'full'},
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
      {
        path: 'chat', component: ChatComponent, children: [
          { path: '', component: ChatBannerComponent },
          { path: ':id', component: ChatDetailComponent },
        ]
      },
      {
        path: 'profile', children:[
          { path: '', component: ProfileComponent },
          {path: 'update', component: ProfileUpdateComponent}
        ]
      },
      {
        path: 'friend', children:[
          {path: ':friendId/profile', component: FriendProfileComponent}
        ]
      },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {

}
