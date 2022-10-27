import {Component, Input, OnInit, Type} from '@angular/core';
import {CodeService} from "../../_services/code_execution/code.service";
import {CodeExecution} from "../../_dtos/code_execution/CodeExecution";
import {Code} from "../../_dtos/code_execution/Code";
import {v4 as uuidv4} from 'uuid';
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";

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

  positions = NbGlobalPhysicalPosition;


  constructor(private codeService: CodeService, private nbToasterService: NbToastrService) { }

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


  previewCode(inputContent: string){
    if(!this.codeService.codeValidation(inputContent)){
      this.nbToasterService.show(
        'The code is not formatted correctly for the preview !',
        `Warning`,
        {
          position: this.positions.TOP_RIGHT,
          status: 'warning'
        }
      );
      return;
    }
    this.codes = [];

    const preview = this.codeService.codePreview(inputContent);

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
