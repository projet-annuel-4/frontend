import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbMenuModule,
  NbDialogModule,
  NbSelectModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbButtonModule,
  NbAccordionModule,
  NbInputModule,
  NbUserModule,
  NbTableModule, NbToggleModule, NbSearchModule, NbListModule, NbTabsetModule, NbTreeGridModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from "./auth/auth.module";

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import {CodeExecutionComponent} from "./code/code-execution/code-execution.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProjectExecutionComponent } from './code/project-execution/project-execution.component';
import {MonacoEditorModule} from "./code/lib/editor.module";
import {NgxMonacoEditorConfig} from "./code/lib/config";
import { FeedComponent } from './post/feed/feed.component';
import { CreateComponent } from './post/create/create.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { CommentComponent } from './post/comment/comment.component';
import {CodeNotRunnableComponent} from "./code/code-not-runnable.component";
import { FeedPostComponent } from './post/feed-post/feed-post.component';
import { SearchComponent } from './post/search/search.component';
import { PostCardComponent } from './post/post-card/post-card.component';
import {DatePipe} from "@angular/common";
import { GroupHomeComponent } from './group/group-home/group-home.component';
import { GroupCardComponent } from './group/group-card/group-card.component';
import { GroupProfileComponent } from './group/group-profile/group-profile.component';
import { ProjectMembersCardComponent } from './group/group-profile/project-members-card/project-members-card.component';
import { GroupProjectsCardComponent } from './group/group-profile/group-projects-card/group-projects-card.component';
import { ProjectPageComponent } from './project/project-page/project-page.component';
import { ProjectTreeComponent } from './project/project-page/project-tree/project-tree.component';
import { ActionPanelComponent } from './project/project-page/action-panel/action-panel.component';
import { CreateCommitComponent } from './project/project-page/create-commit/create-commit.component';
import { CreateFileComponent } from './project/project-page/create-file/create-file.component';
import { RevertCommitComponent } from './project/project-page/revert-commit/revert-commit.component';


/************** Config Monaco *************/
declare var monaco: any;

export function onMonacoLoad() {

  console.log((window as any).monaco);

  const uri = monaco.Uri.parse('a://b/foo.json');
  monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
    validate: true,
    schemas: [{
      uri: 'http://myserver/foo-schema.json',
      fileMatch: [uri.toString()],
      schema: {
        type: 'object',
        properties: {
          p1: {
            enum: ['v1', 'v2']
          },
          p2: {
            $ref: 'http://myserver/bar-schema.json'
          }
        }
      }
    }, {
      uri: 'http://myserver/bar-schema.json',
      fileMatch: [uri.toString()],
      schema: {
        type: 'object',
        properties: {
          q1: {
            enum: ['x1', 'x2']
          }
        }
      }
    }]
  });

}

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'assets',
  defaultOptions: { scrollBeyondLastLine: false },
  onMonacoLoad
};
/**************** End monaco Config ***********/


@NgModule({
  declarations: [
    AppComponent,
    CodeExecutionComponent,
    ProjectExecutionComponent,
    FeedComponent,
    CreateComponent,
    PostDetailComponent,
    CommentComponent,
    CodeNotRunnableComponent,
    FeedPostComponent,
    SearchComponent,
    PostCardComponent,
    GroupHomeComponent,
    GroupCardComponent,
    GroupProfileComponent,
    ProjectMembersCardComponent,
    GroupProjectsCardComponent,
    ProjectPageComponent,
    ProjectTreeComponent,
    ActionPanelComponent,
    CreateCommitComponent,
    CreateFileComponent,
    RevertCommitComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //NbThemeModule.forRoot({name: 'cosmic'}),
    NbThemeModule.forRoot({name: 'dark'}),
    NbMenuModule.forRoot(),
    NbDialogModule.forRoot(),
    NbLayoutModule,
    NbEvaIconsModule,
    NbSelectModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    NbCardModule,
    FormsModule,
    NbContextMenuModule,
    MonacoEditorModule.forRoot(),
    NbIconModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbInputModule,
    NbAccordionModule,
    NbUserModule,
    NbTableModule,
    NbToggleModule,
    NbSearchModule,
    NbListModule,
    NbTabsetModule,
    NbTreeGridModule,
  ],
  providers: [
    NbSearchModule,DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
