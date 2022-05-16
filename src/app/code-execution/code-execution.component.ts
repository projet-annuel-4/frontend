import { Component, OnInit } from '@angular/core';
import {Code_executionService} from "../_services/code_execution/code_execution.service";

@Component({
  selector: 'app-code-execution',
  templateUrl: './code-execution.component.html',
  styleUrls: ['./code-execution.component.scss']
})
export class CodeExecutionComponent implements OnInit {

  selectedLanguage;

  inputCode;

  constructor(private codeExecutionService: Code_executionService) { }

  ngOnInit(): void {
  }


  test(){
    alert(this.selectedLanguage);
    alert(this.inputCode);

    //this.codeExecutionService.sendCode(this.selectedLanguage, this.inputCode);
  }

}
