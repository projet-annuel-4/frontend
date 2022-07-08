import {Component, Input, OnInit, Type} from '@angular/core';
import {Code_executionService} from "../../_services/code_execution/code_execution.service";
import {environment} from "../../../environments/environment.prod";
import {auth_service, user_service} from "../../../environments/environment";
import {CodeExecution} from "../../_dtos/code_execution/CodeExecution";
import {NbDialogService} from "@nebular/theme";
import {CodeNotRunnableComponent} from "../code-not-runnable.component";

@Component({
  selector: 'app-code-execution',
  templateUrl: './code-execution.component.html',
  styleUrls: ['./code-execution.component.scss']
})
export class CodeExecutionComponent implements OnInit {

  @Input()
  inputCode: string;

  codeToExecute = new CodeExecution();

  constructor(private codeExecutionService: Code_executionService, private dialogService: NbDialogService) { }

  ngOnInit(): void {


  }


//TODO : Vérifier que le code soit runnable (langage + code bien formé)

  isRunnable(): boolean{
    /*
    if(runnable(code)){
      return true;
    }
    alert ("Code no runnable");

     */
    return false;

  }

  //TODO : Déplacer sendCode() dans create.component.ts
  //TODO : Trouver le moyen de passer le isRunnable dans le composant de création
  //      si le code n'est runnable => Popup de confirmation (CodeNotRunnableComponent)
  sendCode(){


    if (!this.isRunnable()){
      //popup "Your code is not runnable. Post anywhay ?" yes/no
      this.dialogService.open(CodeNotRunnableComponent)

      /*
      if (non){
        return;
      }
       */
    }

    this.codeExecutionService.sendCode(this.codeToExecute).subscribe(
      res => {},
      error => {
        alert(error['error']);
      }
    );
  }

}
