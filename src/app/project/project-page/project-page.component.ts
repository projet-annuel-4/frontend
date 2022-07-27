import {ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

import {NbDialogService} from "@nebular/theme";
import {CreateCommitComponent} from "./create-commit/create-commit.component";
import {CreateFileComponent} from "./create-file/create-file.component";
import {ActivatedRoute, Params} from "@angular/router";
import {RevertCommitComponent} from "./revert-commit/revert-commit.component";
import {FileService} from "../../_services/project/fileService";

import {ProjectTreeComponent} from "./project-tree/project-tree.component";
import {Filess} from "../../_dtos/project/Filess";


declare let monaco: any;




@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit, OnChanges {

  editorOptions = {theme: 'vs-dark', language: 'python', readonly: true};
  code: string= 'Bienvenue séléctionnez un fichier ou créer en un :)';
  selectedFile: Filess = null;
  fileModified:boolean = false;
  branchId:number;
  atLeastOneFileModified: boolean = false;

  @ViewChild(ProjectTreeComponent ) child: ProjectTreeComponent ;
  @ViewChild(CreateCommitComponent ) createCommitchild: CreateCommitComponent ;

  onSelectedFileChange(selectedFile: number) {
    console.log('here');
  }



  constructor(private cf: ChangeDetectorRef,
              private dialogService: NbDialogService,
              private route: ActivatedRoute,
              private fileService: FileService) {

  }


  ngOnInit(): void {
    this.updateOptions();
    console.log(this.code);

    this.route.params.subscribe((params: Params): void => {
      this.branchId = params.branchId;
    });
  }

  ngOnChanges(simpleChanges: SimpleChanges){

  }


  onInit() {
  }

  updateOptions() {
  }

  sendCode() {
  }

  setSelectedFile(file: Filess) {
    this.selectedFile = file;
    this.code ='';
    document.getElementById('monaco-editor').style.display ='none';
    document.getElementById('fileName').innerHTML = file.name;
    this.fileService.getFileData(this.branchId, this.selectedFile.id).subscribe(
      data => this.code = this.convertByteArrayToString(data)   ,
      () => {},
      () => {document.getElementById('monaco-editor').style.display ='block';}
    );
    this.fileModified = false;
    console.log("in proj page : " + this.fileModified);
  }

  convertByteArrayToString(data: ArrayBuffer): string {
    const jsonBytesToString = String.fromCharCode(...new Uint8Array(data));
    return jsonBytesToString;
  }

  setFileChanged($event: Event) {
    console.log("coucou");
    this.fileModified = true;
  }

  saveFile() {
    console.log('lalalalal');
    const fileContent = this.code;
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const file = new File([blob], "foo.txt", {type: "text/plain"} );
    const data: FormData = new FormData();
    data.append("file", file);
    this.fileService.saveFile(this.branchId, this.selectedFile.id, data).subscribe(
      () => {},
      () => {},
      () => {
        alert('le fichier à bien été enregistré!');
        this.atLeastOneFileModified = true;
      }
    );
  }

  deleteFile() {
    if( confirm('Etes vous sur de supprimer ce fichier ?')) {
      this.fileService.deleteFile(this.branchId, this.selectedFile.id).subscribe(
        () => {},
        () => {},
        () => {alert('le fichier à bien été supprimé');this.child.uppdateFilesV2()}
      );
    }
  }

  showDiff() {
    console.log("diff");
  }

  commit() {
    if ( this.atLeastOneFileModified === false){
      alert("Aucun fichier n'a été modifier depuis le dernier commit");
      return;
    }
    let branchId;
    this.route.params.subscribe((params: Params): void => {
      branchId = params.branchId;
    });
    localStorage.setItem('branchId', branchId);
    console.log("commit");
    this.dialogService.open(CreateCommitComponent).onClose.subscribe(
      () => {},
      () => {},
      () => {
        if(localStorage.getItem('commit') === 'true'){
          this.atLeastOneFileModified = false;
        }
        localStorage.removeItem('commit');
      });
  }

  revert() {
    let branchId;
    this.route.params.subscribe((params: Params): void => {
      branchId = params.branchId;

    });
    localStorage.setItem('branchId', branchId);
    this.dialogService.open(RevertCommitComponent);
  }

  createFile() {
    let branchId;
    this.route.params.subscribe((params: Params): void => {
      branchId = params.branchId;
    });
    localStorage.setItem('branchId', branchId);
    let createFileComponent = this.dialogService.open(CreateFileComponent);
    createFileComponent.onClose.subscribe(
      () => {},
      () => {alert("la")},
      () => {this.child.uppdateFiles() }
    );

  }

}
