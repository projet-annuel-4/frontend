import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {FileService} from "../../../_services/project/fileService";
import {CommitService} from "../../../_services/project/commitService";
import {CreateFileRequest} from "../../../_dtos/project/CreateFileRequest";
import {Commit} from "../../../_dtos/project/Commit";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-revert-commit',
  templateUrl: './revert-commit.component.html',
  styleUrls: ['./revert-commit.component.css']
})
export class RevertCommitComponent implements OnInit {

  commits: Commit[];

  constructor(protected ref: NbDialogRef<RevertCommitComponent>, private commitService: CommitService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadCommit();
  }

  loadCommit(): void {
    this.commitService.getAllCommit(+localStorage.getItem('branchId')).subscribe(
      commit => this.commits = commit,
      () => {},
      () => {this.sortCommits(); });
  }

  sortCommits(): void {
    this.commits.sort( (commitA, commitB ) => new Date(commitA.creationDate).getTime() - new Date(commitB.creationDate).getTime());
  }

  revertCommit() {
    const fileRequest = new CreateFileRequest((document.getElementById('fileName')as HTMLInputElement).value);

    const commitId = localStorage.getItem('commitId');
    console.log("commit : " + commitId);
    const branchId = localStorage.getItem('branchId');
    this.commitService.revert(+branchId, parseInt(commitId)).subscribe(
      () => {},
      () => {},
      () => {
        localStorage.removeItem('branchId');
        localStorage.removeItem('commitId');
        alert("Projet à bien été revert");
        window.location.reload();
      }
    );

    this.ref.close();
  }

  checkInput(id: number) {

    localStorage.setItem('commitId', id.toString());
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
