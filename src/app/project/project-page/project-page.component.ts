import {ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges, ViewChild,} from '@angular/core';

import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {FileService} from '../../_services/project/fileService';

import {ProjectTreeComponent} from './project-tree/project-tree.component';
import {Filess} from '../../_dtos/project/Filess';
import {BranchService} from '../../_services/project/branchService';
import {Commit} from '../../_dtos/project/Commit';
import {delay} from 'rxjs/operators';
import {CreateFileRequest} from '../../_dtos/project/CreateFileRequest';
import {CreateBranchRequest} from '../../_dtos/project/CreateBranchRequest';
import {CreateCommitRequest} from '../../_dtos/project/CreateCommitRequest';
import {CommitService} from '../../_services/project/commitService';
import {FormControl, FormGroup} from '@angular/forms';

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
  mergeBranchList = [];
  selectedBranch: string;
  revertCommitId: string;
  mergeCommitId: string;
  branchGroup: FormGroup;
  @ViewChild(ProjectTreeComponent) child: ProjectTreeComponent;

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
    this.branchGroup = new FormGroup({
      branchId: new FormControl()
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
    await this.branchService.getActualBranch(this.projectId).toPromise().then(data => {
      this.branchName = data.name;
      this.mergeBranchList = this.branchList.filter(value => value !== data.name);
    });
  }

  async checkout(branch: string) {
    await this.branchService.checkout(this.projectId, branch).toPromise()
      .then(async (data) => {
        if (data) {
          this.nbToasterService.show(data, `Warning`, {
            position: this.positions.TOP_RIGHT,
            status: 'danger',
          });
        } else {
          await this.loadCurrentBranch();
          this.child.updateFiles();
          await this.router.navigateByUrl('/group/' + this.groupId + '/project/' + this.projectId + '/branch/' + this.branchName);
          window.location.reload();
        }
      });
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

  async onChangeBranch(element: string) {
    console.log(element);
    await this.checkout(element);
  }

  setFileChanged($event: Event) {
    this.fileModified = true;
  }

  saveFile() {
    if (this.selectedFile && this.selectedFile.name && this.selectedFile.name !== '') {
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
    } else {
      this.nbToasterService.show('You need to select file to save', `Warning`, {
        position: this.positions.TOP_RIGHT,
        status: 'warning',
      });
    }
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
    this.onOverlay();
  }

  hideCreateFilePopup() {
    this.createFilePopup = 'pop-up-none';
    this.offOverlay();
  }

  createFile() {
    const fileRequest = new CreateFileRequest(
      (document.getElementById('createFileName') as HTMLInputElement).value
    );
    this.fileService.create(this.projectId, fileRequest).subscribe(
      data => {
        console.log(this.nbToasterService);
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
    this.offOverlay();
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
    this.onOverlay();
  }

  hideCommitPopup() {
    this.createCommitPopup = 'pop-up-none';
    this.offOverlay();
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
    this.onOverlay();
    this.loadCommit();
  }

  hideRevertCommitPopup() {
    this.revertCommitPopup = 'pop-up-none';
    this.offOverlay();
  }

  revertCommit() {
    if (this.revertCommitId && this.revertCommitId !== '') {
      this.commitService.revert(this.projectId, this.revertCommitId).subscribe(
        () => {
          this.nbToasterService.show('Commit has been revert successfully', `Done`, {
            position: this.positions.TOP_RIGHT,
            status: 'success',
          });
          delay(2000);
          window.location.reload();
        },
        () => {
        },
        () => {
          this.hideRevertCommitPopup();
        }
      );
    } else {
      this.nbToasterService.show('You need to check a commit', `Revert warning`, {
        position: this.positions.TOP_RIGHT,
        status: 'warning',
      });
    }
  }

  /***** Create Branch *****/
  showCreateBranchPopup() {
    this.createBranchPopup = 'pop-up-block';
    this.onOverlay();
  }

  hideCreateBranchPopup() {
    this.createBranchPopup = 'pop-up-none';
    this.offOverlay();
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
    this.mergeBranchPopup = 'pop-up-block';
    this.onOverlay();
  }

  hideMergeBranchPopup() {
    this.mergeBranchPopup = 'pop-up-none';
    this.mergeBranchList = this.branchList.filter(value => value !== this.branchName);
    this.offOverlay();
  }


  mergeBranch() {
    if (this.mergeCommitId && this.mergeCommitId !== '') {
      this.branchService.merge(this.projectId, this.mergeCommitId).subscribe(
        () => {
          this.nbToasterService.show('Branch has been merged successfully', `Done`, {
            position: this.positions.TOP_RIGHT,
            status: 'success',
          });
          delay(2000);
          // window.location.reload();
        },
        () => {
        },
        () => {
          this.hideMergeBranchPopup();
        }
      );
    } else {
      this.nbToasterService.show('You need to check a branch', `Revert warning`, {
        position: this.positions.TOP_RIGHT,
        status: 'warning',
      });
    }
  }

  checkRevertInput(selected: string) {
    this.revertCommitId = selected;
    const checkbox = document.getElementsByClassName(
      'commitRevertCheckBox'
    ) as HTMLCollectionOf<HTMLInputElement>;
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].checked = false;
    }
    (document.getElementById('commit_' + selected) as HTMLInputElement).checked = true;
  }

  branchMergeInput(selected: string) {
    this.mergeCommitId = selected;
    const checkbox = document.getElementsByClassName(
      'mergerBranchCheckBox'
    ) as HTMLCollectionOf<HTMLInputElement>;
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].checked = false;
    }
    (document.getElementById('branch_' + selected) as HTMLInputElement).checked = true;
  }

  async loadCommit() {
    await this.commitService.getAllCommit(this.projectId).toPromise().then(data => (this.commits = data));
  }

  sortCommits(): void {
    this.commits.sort(
      (commitA, commitB) =>
        new Date(commitA.date).getTime() - new Date(commitB.date).getTime()
    );
  }


  onOverlay() {
    document.getElementById('overlay').style.display = 'block';
  }

  offOverlay() {
    document.getElementById('overlay').style.display = 'none';
  }


}
