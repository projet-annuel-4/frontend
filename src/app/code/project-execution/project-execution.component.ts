import { Component, OnInit } from '@angular/core';
import {NgxEditorModel} from "../lib/types";


declare var monaco: any;


@Component({
  selector: 'app-project-execution',
  templateUrl: './project-execution.component.html',
  styleUrls: ['./project-execution.component.scss']
})
export class ProjectExecutionComponent implements OnInit {

  constructor() { }

  editor:any;
  code:string;
  toggleLanguage = true;

  chosenLanguage: string;


  options = {
    theme: 'vs-dark',
    language: 'javascript'
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

  updateOptions(){
    this.toggleLanguage = !this.toggleLanguage;
    if (this.toggleLanguage) {
      //this.code = this.cssCode;
      //this.options = Object.assign({}, this.options, { language: 'java' });
      //this.options = Object.assign({}, this.options, { language: 'java' });
      this.options = Object.assign({}, this.options, { language: this.chosenLanguage });
      console.log("langage choisi : " + this.options.language);
    } else {
      //this.code = this.jsCode;
      this.options = Object.assign({}, this.options, { language: this.chosenLanguage });
      console.log("langage choisi : " + this.options.language);
    }
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

}
