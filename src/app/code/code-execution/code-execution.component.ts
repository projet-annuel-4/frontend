import {Component, Input, OnInit, Type} from '@angular/core';
import {CodeService} from "../../_services/code_execution/code.service";
import {CodeExecution} from "../../_dtos/code_execution/CodeExecution";
import {Code} from "../../_dtos/code_execution/Code";
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-code-execution',
  templateUrl: './code-execution.component.html',
  styleUrls: ['./code-execution.component.scss']
})
export class CodeExecutionComponent implements OnInit {

  @Input()
  inputContent;

  codesString = [];
  codeToExecute = new CodeExecution();
  codes: Code[] = [];

  CODE_RUNNABLE_KEY = 'code-runnable';


  constructor(private codeService: CodeService) { }

  ngOnInit(): void {

  }

  /* Template content with code *
    j'ai ça
    #`js` code1 ##
    puis encode ça
    #`js` code2 ##
    blablabla
    #`js` code3 ##

   */


  codePreview(){
    this.codes = [];

    //const regexp = RegExp('#(.+?)#(.+?)#(.+?)#','g');
    const regexp = RegExp('#(.+?)##','g');
    const str = this.inputContent;

    let codesFound = this.codeService.findCodeInContent(regexp, str);

    codesFound.forEach(code => {
      this.codes.push(this.codeService.createCodeFromString(code));
    });

    this.codesString = codesFound;
  }



  sendCode(codeId: string, language: string, code: string){

    this.codeToExecute.language = language;
    this.codeToExecute.code = code;

    this.codeService.sendCode(this.codeToExecute).subscribe(
      res => {

        this.codes.forEach(code => {
          if(code.id === codeId) {
            code.output = res.message;
            code.isRunnable = res.success;
          }
          // Si un des codes n'est pas runnable on localstorage pour passer l'information
          //  au composant de création
          if(!code.isRunnable) {
            localStorage.setItem(this.CODE_RUNNABLE_KEY, "false");
          }
        });

      },
      error => {
        alert(error['error']);
      }
    );

  }

}
