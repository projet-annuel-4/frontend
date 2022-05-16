import { Component, OnInit } from '@angular/core';
import {Code_executionService} from "../_services/code_execution/code_execution.service";
import {environment} from "../../environments/environment.prod";
import {auth_service, user_service} from "../../environments/environment";
import {CodeExecution} from "../_dtos/code_execution/CodeExecution";

@Component({
  selector: 'app-code-execution',
  templateUrl: './code-execution.component.html',
  styleUrls: ['./code-execution.component.scss']
})
export class CodeExecutionComponent implements OnInit {

  codeToExecute = new CodeExecution();

  constructor(private codeExecutionService: Code_executionService) { }

  ngOnInit(): void {
  }


  sendCode(){
    this.codeExecutionService.sendCode(this.codeToExecute).subscribe(

      res => {},
      error => {
        alert(error['error']);
      }

    );
  }

}
