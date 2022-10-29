import {ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild,} from '@angular/core';

import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {CreateCommitComponent} from './create-commit/create-commit.component';
import {ActivatedRoute, Router} from '@angular/router';
import {RevertCommitComponent} from './revert-commit/revert-commit.component';
import {FileService} from '../../_services/project/fileService';

import {ProjectTreeComponent} from './project-tree/project-tree.component';
import {Filess} from '../../_dtos/project/Filess';
import {BranchService} from '../../_services/project/branchService';
import {Commit} from '../../_dtos/project/Commit';
import {delay} from 'rxjs/operators';
import {MergeBranchComponent} from './merge-branch/merge-branch.component';
import {CreateFileRequest} from '../../_dtos/project/CreateFileRequest';
import {CreateBranchRequest} from '../../_dtos/project/CreateBranchRequest';
import {CreateCommitRequest} from '../../_dtos/project/CreateCommitRequest';
import {CommitService} from '../../_services/project/commitService';

declare let monaco: any;

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css'],
})
export class ProjectPageComponent implements OnInit, OnChanges {
  editorOptions = {theme: 'vs-dark', language: 'python', readonly: true};
  code = 'Welcome ! Select or create a file :)';
  selectedFile: Filess = null;
  fileModified = false;
  branchName = 'master';
  projectId: number;
  groupId: number;
  atLeastOneFileModified = false;
  positions = NbGlobalPhysicalPosition;
  branchList = ['master'];
  selectedBranch: string;

  @ViewChild(ProjectTreeComponent) child: ProjectTreeComponent;
  @ViewChild(CreateCommitComponent) createCommitChild: CreateCommitComponent;

  commitExec = false;

  commits: Commit[];

  // Popup
  deleteFilePopup = 'pop-up-none';
  createCommitPopup = 'pop-up-none';
  revertCommitPopup = 'pop-up-none';
  createBranchPopup = 'pop-up-none';
  mergeBranchPopup = 'pop-up-none';
  createFilePopup = 'pop-up-none';

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
    console.log(this.branchName);
  }

  loadBranchList() {
    this.branchService.getAllBranch(this.projectId).subscribe(
      data => (this.branchList = data),
      () => {
      },
      () => {
        document.getElementById('monaco-editor').style.display = 'block';
        this.loadCurrentBranch();
      }
    );
  }

  async loadCurrentBranch() {
    await this.branchService.getActualBranch(this.projectId).toPromise().then(data => (this.branchName = data.name));
  }

  async checkout(branch: string) {
    await this.branchService.checkout(this.projectId, branch).toPromise().then(() => (this.loadCurrentBranch()));
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
  }

  onInit() {
  }

  updateOptions() {
  }

  sendCode() {
  }

  setSelectedFile(file: Filess) {
    this.selectedFile = file;
    this.code = '';
    document.getElementById('monaco-editor').style.display = 'none';
    document.getElementById('fileName').innerHTML = file.name;
    this.fileService.getFileData(this.projectId, this.selectedFile.name).subscribe(
      data => (this.code = this.convertByteArrayToString(data)),
      () => {
      },
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
    window.location.reload();
  }

  setFileChanged($event: Event) {
    this.fileModified = true;
  }

  saveFile() {
    const fileContent = this.code;
    const blob = new Blob([fileContent], {type: 'text/plain'});
    const file = new File([blob], 'foo.txt', {type: 'text/plain'});
    const data: FormData = new FormData();
    data.append('file', file);
    this.fileService.saveFile(this.projectId, this.selectedFile.name, data).subscribe(
      () => {
        this.nbToasterService.show('The file has been saved', `Done`, {
          position: this.positions.TOP_RIGHT,
          status: 'success',
        });
        this.atLeastOneFileModified = true;
      },
      () => {
        this.nbToasterService.show('', `Error`, {
          position: this.positions.TOP_RIGHT,
          status: 'danger',
        });
      },
      () => {
      }
    );
  }

  showDeleteFile() {
    if (this.selectedFile && this.selectedFile.name && this.selectedFile.name !== '') {
      this.deleteFilePopup = 'pop-up-block';
    } else {
      this.nbToasterService.show('You need to select file to delete', `Warning`, {
        position: this.positions.TOP_RIGHT,
        status: 'warning',
      });
    }
  }

  /***** Create File *****/
  showCreateFilePopup() {
    this.createFilePopup = 'pop-up-block';
  }

  hideCreateFilePopup() {
    this.createFilePopup = 'pop-up-none';
  }

  createFile() {
    const fileRequest = new CreateFileRequest(
      (document.getElementById('createFileName') as HTMLInputElement).value
    );
    this.fileService.create(this.projectId, fileRequest).subscribe(
      data => {
        this.nbToasterService.show('File has been saved successfully', `Done`, {
          position: this.positions.TOP_RIGHT,
          status: 'success',
        });
        this.child.updateFiles();
        delay(2000);
      },
      error => {
        delay(2000);
        this.nbToasterService.show(error.error.message, `Error`, {
          position: this.positions.TOP_RIGHT,
          status: 'danger',
        });
        return;
      },
      () => {
        this.hideCreateFilePopup();
      });
  }

  /***** Delete File *****/

  hideDeleteFile() {
    this.deleteFilePopup = 'pop-up-none';
  }

  deleteFile() {
    this.fileService.deleteFile(this.projectId, this.selectedFile.name).subscribe(
      () => {
        this.nbToasterService.show('File deleted successfully', `Done`, {
          position: this.positions.TOP_RIGHT,
          status: 'success',
        });
        this.child.uppdateFilesV2();
        window.location.reload();
      },
      () => {
        this.nbToasterService.show('', `Error`, {
          position: this.positions.TOP_RIGHT,
          status: 'danger',
        });
      },
      () => {
        this.hideDeleteFile();
      }
    );
  }

  /*** Show Diff ***/
  showDiff() {
    console.log('diff');
  }

  /*** Commit ***/
  showCommitPopup() {
    this.createCommitPopup = 'pop-up-block';
  }

  hideCommitPopup() {
    this.createCommitPopup = 'pop-up-none';
  }

  createCommit() {
    const commitRequest = new CreateCommitRequest(
      (document.getElementById('commitName') as HTMLInputElement).value
    );
    this.commitService.create(this.projectId, commitRequest).subscribe(
      () => {
        this.nbToasterService.show('Commit has been saved successfully', `Done`, {
          position: this.positions.TOP_RIGHT,
          status: 'success',
        });
        delay(2000);
      },
      () => {
        this.nbToasterService.show('', `Error`, {
          position: this.positions.TOP_RIGHT,
          status: 'danger',
        });
      },
      () => {
        this.hideCommitPopup();
      }
    );
  }

  /****** Revert ******/
  showRevertCommitPopup() {
    this.revertCommitPopup = 'pop-up-block';
  }

  hideRevertCommitPopup() {
    this.revertCommitPopup = 'pop-up-none';
  }

  revertCommit() {
    const revertCommitComponent = this.dialogService.open(RevertCommitComponent, {
      context: {projectId: this.projectId},
    });
    revertCommitComponent.onClose.subscribe(
      () => {
      },
      () => {
        this.nbToasterService.show('', `Error`, {
          position: this.positions.TOP_RIGHT,
          status: 'danger',
        });
      },
      () => {
        this.nbToasterService.show('Project has been revert', `Done`, {
          position: this.positions.TOP_RIGHT,
          status: 'success',
        });
        this.child.updateFiles();
        window.location.reload();
      }
    );
    this.hideRevertCommitPopup();
  }

  /***** Create Branch *****/
  showCreateBranchPopup() {
    this.createBranchPopup = 'pop-up-block';
  }

  hideCreateBranchPopup() {
    this.createBranchPopup = 'pop-up-none';
  }

  createBranch() {
    const branchRequest = new CreateBranchRequest(
      (document.getElementById('createBranchName') as HTMLInputElement).value
    );
    this.branchService.create(this.projectId, branchRequest).subscribe(
      data => {
        this.nbToasterService.show('Branch has been saved successfully', `Done`, {
          position: this.positions.TOP_RIGHT,
          status: 'success',
        });
        delay(2000);
        window.location.reload();
      },
      error => {
        this.nbToasterService.show(error.error.message, `Error`, {
          position: this.positions.TOP_RIGHT,
          status: 'danger',
        });
      },
      () => {
        this.hideCreateBranchPopup();
      }
    );
  }

  /***** Merge Branch *****/
  showMergeBranchPopup() {
    this.createBranchPopup = 'pop-up-block';
  }

  hideMergeBranchPopup() {
    this.createBranchPopup = 'pop-up-none';
  }

  merge() {
    const result = this.branchList.filter(value => value !== this.branchName);
    const mergeBranchComponent = this.dialogService.open(MergeBranchComponent, {
      context: {projectId: this.projectId, branchList: result, actualBranch: this.branchName},
    });
    mergeBranchComponent.onClose.subscribe(
      () => {
      },
      () => {
        this.nbToasterService.show('', `Error`, {
          position: this.positions.TOP_RIGHT,
          status: 'danger',
        });
        delay(2000);
      },
      () => {
        this.nbToasterService.show('Branch has been merged successfully', `Done`, {
          position: this.positions.TOP_RIGHT,
          status: 'success',
        });
        delay(2000);
        this.child.updateFiles();
        this.hideMergeBranchPopup();
        window.location.reload();
      }
    );
  }

  checkInput(selected: string) {
    this.selectedBranch = selected;
    const checkbox = document.getElementsByClassName(
      'branchCheckBox'
    ) as HTMLCollectionOf<HTMLInputElement>;
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].checked = false;
    }
    (document.getElementById(selected) as HTMLInputElement).checked = true;
  }
}
