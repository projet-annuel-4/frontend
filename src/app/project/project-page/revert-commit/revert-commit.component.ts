import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FileService} from "../../../_services/project/fileService";
import {CommitService} from "../../../_services/project/commitService";
import {CreateFileRequest} from "../../../_dtos/project/CreateFileRequest";
import {Commit} from "../../../_dtos/project/Commit";

@Component({
  selector: 'app-revert-commit',
  templateUrl: './revert-commit.component.html',
  styleUrls: ['./revert-commit.component.css']
})
export class RevertCommitComponent implements OnInit {

  commits: Commit[];

  constructor(protected ref: NbDialogRef<RevertCommitComponent>, private commitService: CommitService) { }

  ngOnInit(): void {
    this.loadCommit();
    this.sortCommits();
  }

  loadCommit(): void {
    this.commitService.getAllCommit(+localStorage.getItem('branchId')).subscribe(
      commit => this.commits = commit,
      () => {},
      () => {this.sortCommits(); });
  }

  sortCommits(): void {
    this.commits.sort( (commitA, commitB ) => commitA.creationDate.getTime() - commitB.creationDate.getTime());
  }

  revertCommit() {
    const fileRequest = new CreateFileRequest((document.getElementById('fileName')as HTMLInputElement).value);
    const branchId: string = localStorage.getItem('branchId');
    const commitId = 1;
    this.commitService.revert(+branchId, commitId);
    localStorage.removeItem('branchId');
    localStorage.removeItem('commitId');
    this.ref.close();
  }

  checkInput(id: number) {
    alert('ici');
    let checkbox = (document.getElementsByClassName('commitCheckBox') as HTMLCollectionOf<HTMLInputElement>);
    for( let i = 0; i < checkbox.length; i++) {
      checkbox[i].checked = false;
    }
    (document.getElementById('commit_'+id) as HTMLInputElement).checked = true;
  }

  close() {
    this.ref.close();
  }

}
