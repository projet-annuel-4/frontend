import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbMenuModule,
  NbDialogModule,
  NbSelectModule,
  NbCardModule, NbContextMenuModule, NbIconModule, NbButtonModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from "./auth/auth.module";

import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import {CodeExecutionComponent} from "./code/code-execution/code-execution.component";
import {FormsModule} from "@angular/forms";
import { ProjectExecutionComponent } from './code/project-execution/project-execution.component';
import {MonacoEditorModule} from "./code/lib/editor.module";
import {NgxMonacoEditorConfig} from "./code/lib/config";


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
    ProjectExecutionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({name: 'cosmic'}),
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
    NbButtonModule
  ],
  providers: [
    /*{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },*/

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
