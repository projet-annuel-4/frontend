import { Component, OnInit } from '@angular/core';
//import {NgxEditorModel} from "../lib/types";
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
  editorOptions = {theme: 'vs-dark', language: 'python'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';

  constructor(private codeExecution: CodeService) { }

  editor:any;
  toggleLanguage = true;


  options = {
    theme: 'vs-dark',
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


  // model: NgxEditorModel = {
  //   value: this.jsonCode,
  //   language: 'json'
  // };

  ngOnInit(): void {
    this.updateOptions();
  }

  onInit(editor){
    this.editor = editor;
    console.log(editor);
    // this.model = {
    //   value: "coucou c'est moi",
    //   language: 'json',
    //   uri: monaco.Uri.parse('a://b/foo.json')
    // };
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
    this.codeExecution.sendCode(this.codeExecutionModel);
  }
}
