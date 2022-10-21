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


  previewCode(inoutContent: string){
    this.codes = [];

    const preview = this.codeService.codePreview(inoutContent);

    this.codes = preview.codes;
    this.codesString = preview.codesFound;
  }


  sendCode(codeId: number, language: string, code: string){

    this.codeToExecute.id = codeId;
    this.codeToExecute.language = language;
    this.codeToExecute.code = code;

    this.codeService.sendCode(this.codeToExecute).subscribe(
      res => {
        /*
        console.log(res.id);
        console.log(res.status);
        console.log(res.output[0]);*/

        let console = document.getElementById("console_"+codeId) as HTMLTextAreaElement;
        console.value = res.output[0];
        /*this.codes.forEach(code => {
          if(code.id === codeId) {
            code.output = res.output[0];
            if(res.status == "done") code.isRunnable = true;
            if(res.status == "false") code.isRunnable = false;
          }

          // Si un des codes n'est pas runnable on localstorage pour passer l'information
          //  au composant de création
          if(!code.isRunnable) {
            localStorage.setItem(this.CODE_RUNNABLE_KEY, "false");
          }
        });*/
      },
      error => {
        console.log(error);
      }
    );
  }
}
