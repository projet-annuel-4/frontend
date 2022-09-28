import {ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {CreateCommitComponent} from "./create-commit/create-commit.component";
import {CreateFileComponent} from "./create-file/create-file.component";
import {ActivatedRoute, Params} from "@angular/router";
import {RevertCommitComponent} from "./revert-commit/revert-commit.component";
import {FileService} from "../../_services/project/fileService";

import {ProjectTreeComponent} from "./project-tree/project-tree.component";
import {Filess} from "../../_dtos/project/Filess";
import {DeleteFileDialogComponent} from "../../shared/dialog/delete-file-dialog.component";


declare let monaco: any;




@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit, OnChanges {

  editorOptions = {theme: 'vs-dark', language: 'python', readonly: true};
  code: string= 'Welcome ! Select or create a file :)';
  selectedFile: Filess = null;
  fileModified:boolean = false;
  branchId:number;
  atLeastOneFileModified: boolean = false;
  positions = NbGlobalPhysicalPosition;

  @ViewChild(ProjectTreeComponent ) child: ProjectTreeComponent ;
  @ViewChild(CreateCommitComponent ) createCommitchild: CreateCommitComponent ;

  onSelectedFileChange(selectedFile: number) {
    console.log('here');
  }



  constructor(private cf: ChangeDetectorRef,
              private dialogService: NbDialogService,
              private route: ActivatedRoute,
              private fileService: FileService,
              private nbToasterService:NbToastrService) {
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
  }

  convertByteArrayToString(data: ArrayBuffer): string {
    const jsonBytesToString = String.fromCharCode(...new Uint8Array(data));
    return jsonBytesToString;
  }

  setFileChanged($event: Event) {
    this.fileModified = true;
  }

  saveFile() {
    const fileContent = this.code;
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const file = new File([blob], "foo.txt", {type: "text/plain"} );
    const data: FormData = new FormData();
    data.append("file", file);
    this.fileService.saveFile(this.branchId, this.selectedFile.id, data).subscribe(
      () => {},
      () => {},
      () => {
        this.nbToasterService.show('The file has been saved', `Done`, { position:this.positions.TOP_RIGHT, status:"success" })
        this.atLeastOneFileModified = true;
      }
    );
  }

  deleteFile() {
    this.dialogService.open(DeleteFileDialogComponent).onClose.subscribe(confirmation => {
      if(confirmation) {
        this.fileService.deleteFile(this.branchId, this.selectedFile.id).subscribe(
          () => {},
          () => {},
          () => {
            this.nbToasterService.show('File deleted successfully', `Done`, { position:this.positions.TOP_RIGHT, status:"success" })
            this.child.uppdateFilesV2()
          }
        );
      }
    });
  }

  showDiff() {
    console.log("diff");
  }

  commit() {
    if (this.atLeastOneFileModified === false){
      this.nbToasterService.show('No files change since the last commit', ``, { position:this.positions.TOP_RIGHT, status:"info" })
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
      () => {this.nbToasterService.show('', `Error`, { position:this.positions.TOP_RIGHT, status:"danger" })},
      () => {this.child.uppdateFiles() }
    );

  }

}
