import {Component, Input, OnInit, Type} from '@angular/core';
import {Code_executionService} from "../../_services/code_execution/code_execution.service";
import {CodeExecution} from "../../_dtos/code_execution/CodeExecution";
import {Code} from "../../_dtos/code_execution/Code";
import {NbDialogService} from "@nebular/theme";
import {CodeNotRunnableComponent} from "../code-not-runnable.component";
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


  constructor(private codeExecutionService: Code_executionService, private dialogService: NbDialogService) { }

  ngOnInit(): void {

  }


//TODO : Vérifier que le code soit runnable (langage + code bien formé)

  isRunnable(): boolean{
    /*
    if(runnable(code)){
      return true;
    }
     */
    alert ("Code no runnable");

    return false;
  }


  codePreview(){
    this.codes = [];

    //const regexp = RegExp('#(.+?)#(.+?)#(.+?)#','g');
    const regexp = RegExp('#(.+?)##','g');
    const str = this.inputContent;
    let matches;
    let codesFound = [];

    while ((matches = regexp.exec(str)) !== null) {
      codesFound.push(matches[0]);
    }


    codesFound.forEach(code => {
      this.codes.push(this.createCodeFromString(code));
    });

    this.codesString = codesFound;
  }

  createCodeFromString(codeString: string): Code{
    const codeRegex = RegExp('`(.+?)`','g');
    let languageMatch = codeRegex.exec(codeString);

    return new Code(uuidv4(), languageMatch[0], codeString, "", false);
  }



  //TODO : Trouver le moyen de passer le isRunnable dans le composant de création
  //      si le code n'est runnable => Popup de confirmation (CodeNotRunnableComponent)
  sendCode(codeId: string, language: string, code: string){

   this.codeToExecute.language = language;
   this.codeToExecute.code = code;

    if (!this.isRunnable()){
      //popup "Your code is not runnable. Post anywhay ?" yes/no
      this.dialogService.open(CodeNotRunnableComponent)
      /*
      if (non){
        return;
      }
       */
    }


    console.log("codeId : " + codeId);
    console.log("this.codeToExecute.language : " + this.codeToExecute.language);
    console.log("this.codeToExecute.code : " + this.codeToExecute.code);
    console.log("--------------------------------------------------");

    /*
    this.codeExecutionService.sendCode(this.codeToExecute).subscribe(
      res => {
        this.codes.forEach(code => {
          if(code.id === codeId) {
            code.output = res.message;
            code.isRunnable = res.success;
          }
        })
      },
      error => {
        alert(error['error']);
      }
    );

     */
  }

}
