import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-execution',
  templateUrl: './code-execution.component.html',
  styleUrls: ['./code-execution.component.scss']
})
export class CodeExecutionComponent implements OnInit {

  selectedLanguage;

  inputCode;

  constructor() { }

  ngOnInit(): void {
  }



  test(){
    alert(this.selectedLanguage);
    alert(this.inputCode);
  }

  uploadFile(){

  }





}
