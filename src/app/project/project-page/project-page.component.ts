import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { CreateCommitComponent } from './create-commit/create-commit.component';
import { CreateFileComponent } from './create-file/create-file.component';
import {ActivatedRoute, Params, Router} from '@angular/router';
import { RevertCommitComponent } from './revert-commit/revert-commit.component';
import { FileService } from '../../_services/project/fileService';

import { ProjectTreeComponent } from './project-tree/project-tree.component';
import { Filess} from '../../_dtos/project/Filess';
import { DeleteFileDialogComponent } from '../../shared/dialog/delete-file-dialog.component';
import {Branch} from '../../_dtos/project/Branch';
import {BranchService} from '../../_services/project/branchService';
import {CreateBranchComponent} from './create-branch/create-brach.component';
import {CreateCommitRequest} from "../../_dtos/project/CreateCommitRequest";
import {CommitService} from "../../_services/project/commitService";
import {Commit} from "../../_dtos/project/Commit";
import {CreateFileRequest} from "../../_dtos/project/CreateFileRequest";

declare let monaco: any;

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css'],
})
export class ProjectPageComponent implements OnInit, OnChanges {
  editorOptions = { theme: 'vs-dark', language: 'python', readonly: true };
  code = 'Welcome ! Select or create a file :)';
  selectedFile: Filess = null;
  fileModified = false;
  branchName = 'master';
  projectId: number;
  groupId: number;
  atLeastOneFileModified = false;
  positions = NbGlobalPhysicalPosition;
  branchList = ['master'];

  @ViewChild(ProjectTreeComponent) child: ProjectTreeComponent;
  @ViewChild(CreateCommitComponent) createCommitChild: CreateCommitComponent;

  commitExec = false;

  commits: Commit[];

  //Popup
  deleteFilePopup: string = 'pop-up-none';
  createCommitPopup: string = 'pop-up-none';
  revertCommitPopup: string = 'pop-up-none';

  constructor(
    private cf: ChangeDetectorRef,
    private dialogService: NbDialogService,
    private router: Router,
    private route: ActivatedRoute,
    private fileService: FileService,
    private branchService: BranchService,
    private nbToasterService: NbToastrService,
    private commitService: CommitService
  ) {
    this.route.params.subscribe(params => {
      this.projectId = params.projectId;
      this.groupId = params.groupId;
    });
  }

  ngOnInit(): void {
    this.updateOptions();
    this.loadBranchList();
    this.loadCurrentBranch();
    console.log(this.branchName);

    this.loadCommit();

  }

 loadBranchList() {
  this.branchService.getAllBranch(this.projectId).subscribe(
    data => (this.branchList = data),
    () => {},
    () => {
      document.getElementById('monaco-editor').style.display = 'block';
    }
  );
 }
 async loadCurrentBranch() {
     await this.branchService.getActualBranch(this.projectId).toPromise().then(data => (this.branchName = data.name));
  }
  async checkout(branch: string) {
     await this.branchService.checkout(this.projectId, branch).toPromise().then(() => (this.loadCurrentBranch()));
  }
  ngOnChanges(simpleChanges: SimpleChanges) {}

  onInit() {}

  updateOptions() {}

  sendCode() {}

  setSelectedFile(file: Filess) {
    this.selectedFile = file;
    this.code = '';
    document.getElementById('monaco-editor').style.display = 'none';
    document.getElementById('fileName').innerHTML = file.name;
    this.fileService.getFileData(this.projectId, this.selectedFile.name).subscribe(
      data => (this.code = this.convertByteArrayToString(data)),
      () => {},
      () => {
        document.getElementById('monaco-editor').style.display = 'block';
      }
    );
    this.fileModified = false;
  }

  convertByteArrayToString(data: ArrayBuffer): string {
    const jsonBytesToString = String.fromCharCode(...new Uint8Array(data));
    return jsonBytesToString;
  }

  async onChangeBranch($event: Event, element) {
    console.log(element);
    await this.checkout(element);
    this.child.updateFiles();
    await this.router.navigateByUrl('/group/' + this.groupId + '/project/' + this.projectId + '/branch/' + this.branchName);

  }

  setFileChanged($event: Event) {
    this.fileModified = true;
  }

  saveFile() {
    const fileContent = this.code;
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const file = new File([blob], 'foo.txt', { type: 'text/plain' });
    const data: FormData = new FormData();
    data.append('file', file);
    this.fileService.saveFile(this.projectId, this.selectedFile.name, data).subscribe(
      () => {},
      () => {},
      () => {
        this.nbToasterService.show('The file has been saved', `Done`, {
          position: this.positions.TOP_RIGHT,
          status: 'success',
        });
        this.atLeastOneFileModified = true;
      }
    );

  }

  showDeleteFile(){
    this.deleteFilePopup = 'pop-up-block';
  }
  hideDeleteFile(){
    this.deleteFilePopup = 'pop-up-none';
  }

  deleteFile() {
    this.fileService.deleteFile(this.projectId, this.selectedFile.name).subscribe(
      () => {},
      () => {},
      () => {
        this.nbToasterService.show('File deleted successfully', `Done`, {
          position: this.positions.TOP_RIGHT,
          status: 'success',
        });
        this.child.uppdateFilesV2();
      }
    );
  }

  showDiff() {
    console.log('diff');
  }

/*** Commit ***/
  showCommitPopup(){
    this.createCommitPopup = 'pop-up-block';
  }
  hideCommitPopup(){
    this.createCommitPopup = 'pop-up-none';
    this.getCommitExec();
    localStorage.setItem('commit', 'false')
  }

  createCommit() {
    const commitRequest = new CreateCommitRequest(
      (document.getElementById('commitName') as HTMLInputElement).value
    );
    this.commitExec = true;
    const branchId: string = localStorage.getItem('branchId');
    this.commitService.create(this.projectId, commitRequest).subscribe(
      () => {},
      () => {},
      () => {
        localStorage.setItem('commit', 'true');
        this.hideCommitPopup();

        if (localStorage.getItem('commit') === 'true') {
          this.atLeastOneFileModified = false;
        }
        localStorage.removeItem('commit');
      }
    );
  }

  getCommitExec(): boolean {
    return this.commitExec;
  }


/*  OLD Commit
  commit() {
    const createCommitComponent = this.dialogService.open(CreateCommitComponent, {
      context: { projectId: this.projectId },
    });
    createCommitComponent.onClose.subscribe(
      () => {},
      () => {
        this.nbToasterService.show('', `Error`, {
          position: this.positions.TOP_RIGHT,
          status: 'danger',
        });
      },
      () => {
        if (localStorage.getItem('commit') === 'true') {
          this.atLeastOneFileModified = false;
        }
        localStorage.removeItem('commit');
      }
    );
  }

 */
/*******/


/****** Revert ******/
  showRevertCommitPopup(){
    this.revertCommitPopup = 'pop-up-block';
  }
  hideRevertCommitPopup(){
    this.revertCommitPopup = 'pop-up-none';
  }

  loadCommit(): void {
    this.commitService.getAllCommit(this.projectId).subscribe(
      data => (this.commits = data),
      () => {},
      () => {
        this.sortCommits();
      }
    );
  }

  sortCommits(): void {
    this.commits.sort(
      (commitA, commitB) =>
        new Date(commitA.date).getTime() - new Date(commitB.date).getTime()
    );
  }

  revertCommit() {
    const fileRequest = new CreateFileRequest(
      (document.getElementById('fileName') as HTMLInputElement).value
    );

    const commitId = localStorage.getItem('commitId');
    console.log('commit : ' + commitId);
    const branchId = localStorage.getItem('branchId');
    this.commitService.revert(+branchId, parseInt(commitId)).subscribe(
      () => {},
      () => {},
      () => {
        localStorage.removeItem('branchId');
        localStorage.removeItem('commitId');
        this.nbToasterService.show('Project has been revert', `Done`, {
          position: this.positions.TOP_RIGHT,
          status: 'success',
        });
        window.location.reload();
      }
    );

    this.hideRevertCommitPopup();
  }

  checkInput(id: string) {
    localStorage.setItem('commitId', id.toString());
    const checkbox = document.getElementsByClassName(
      'commitCheckBox'
    ) as HTMLCollectionOf<HTMLInputElement>;
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].checked = false;
    }
    (document.getElementById('commit_' + id) as HTMLInputElement).checked = true;
  }


  Oldrevert() {
    /*let branchName;
    this.route.params.subscribe((params: Params): void => {
      branchName = params.branchName;
    });
    localStorage.setItem('branchName', branchName);
     */
    this.dialogService.open(RevertCommitComponent, {
      context: { projectId: this.projectId },
    });
  }
/*************/

  createBranch() {
    const createBranchComponent = this.dialogService.open(CreateBranchComponent, {
      context: { projectId: this.projectId },
    });

    createBranchComponent.onClose.subscribe(
      () => {},
      () => {
        this.nbToasterService.show('', `Error`, {
          position: this.positions.TOP_RIGHT,
          status: 'danger',
        });
      },
      () => {
        this.child.updateFiles();
      }
    );
  }

  merge() {
  }

  createFile() {
    let branchName;
    this.route.params.subscribe((params: Params): void => {
      branchName = params.branchName;
    });
    localStorage.setItem('branchName', branchName);
    const createFileComponent = this.dialogService.open(CreateFileComponent, {
      context: { projectId: this.projectId},
    });
    createFileComponent.onClose.subscribe(
      () => {},
      () => {
        this.nbToasterService.show('', `Error`, {
          position: this.positions.TOP_RIGHT,
          status: 'danger',
        });
      },
      () => {
        this.child.updateFiles();
      }
    );
  }
}
