import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './home.component';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

import { HomeRoutingModule } from './home-routing.module';
import {NbSidebarService, NbMenuService, NbTabsetModule} from '@nebular/theme';
import { ChatListComponent } from './chat-list/chat-list.component';
import { UserService } from '../_services/user/user.service';
import { ChatService } from '../_services/chat/chat.service';
import { NotificationService } from '../_services/notification/notification.service';
import { DataService } from '../_services/data/data.service';
import { LoadingComponent } from './loading/loading.component';
import { ChatDetailComponent } from './chat-detail/chat-detail.component';
import { ChatBannerComponent } from './chat-banner/chat-banner.component';
import { NewChatComponent } from './chat-list/new-chat/new-chat.component';
import { FollowerListComponent } from './profile/follower-list/follower-list.component';
import { FollowerItemComponent } from './profile/follower-item/follower-item.component';
import { SubscriptionItemComponent } from './profile/subscription-item/subscription-item.component';
import { SubscriptionListComponent } from './profile/subscription-list/subscription-list.component';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NewGroupComponent} from "./chat-list/new-chat/new-group.component";

@NgModule({
    declarations: [
        HomeComponent,
        ChatComponent,
        ProfileComponent,
        SettingsComponent,
        ChatListComponent,
        LoadingComponent,
        ChatDetailComponent,
        ChatBannerComponent,
        NewChatComponent,
        FollowerListComponent,
        FollowerItemComponent,
        SubscriptionItemComponent,
        SubscriptionListComponent,
        ProfileUpdateComponent,
        NewGroupComponent
    ],
  imports: [
    CommonModule, HomeRoutingModule, SharedModule, NbTabsetModule, ReactiveFormsModule, FormsModule,
  ],
    exports: [
        HomeComponent
    ],
    providers: [
        DataService, NbMenuService, UserService, ChatService, NotificationService
    ]
})
export class HomeModule { }
