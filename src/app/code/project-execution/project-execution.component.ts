import { Component, OnInit } from '@angular/core';
import {NgxEditorModel} from "../lib/types";
import {CodeService} from "../../_services/code_execution/code.service";
import {CodeExecution} from "../../_dtos/code_execution/CodeExecution";


declare var monaco: any;


@Component({
  selector: 'app-project-execution',
  templateUrl: './project-execution.component.html',
  styleUrls: ['./project-execution.component.scss']
})
export class ProjectExecutionComponent implements OnInit {

  codeExecutionModel = new CodeExecution();

  constructor(private codeExecution: CodeService) { }

  editor:any;
  code:string;
  toggleLanguage = true;


  options = {
    theme: 'vs-dark', // TODO : Voir pour Theme custom -> https://github.com/brijeshb42/monaco-themes
    lineNumbers: 'on',
    minimap: {
      enabled: true
    },
    toolbar: 'BarProp'
  };

  jsonCode = [
    '{',
    '    "p1": "v3",',
    '    "p2": false',
    '}'
  ].join('\n');


  model: NgxEditorModel = {
    value: this.jsonCode,
    language: 'json'
  };



  ngOnInit(): void {
    this.updateOptions();
  }

  onInit(editor){
    this.editor = editor;
    console.log(editor);
    this.model = {
      value: this.jsonCode,
      language: 'json',
      uri: monaco.Uri.parse('a://b/foo.json')
    };
  }




  updateOptions(){
    this.toggleLanguage = !this.toggleLanguage;
    if (this.toggleLanguage) {
      this.options = Object.assign({}, this.options, { language: this.codeExecutionModel.language });
    } else {
      this.options = Object.assign({}, this.options, { language: this.codeExecutionModel.language });
    }
  }


  sendCode(){
    console.log("language : " + this.codeExecutionModel.language);
    console.log("code : " + this.codeExecutionModel.code);

    this.codeExecution.sendCode(this.codeExecutionModel);
  }

}
