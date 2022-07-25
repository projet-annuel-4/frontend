import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {UserService} from "../../../_services/user/user.service";
import {GroupService} from "../../../_services/group/group.service";
import {CommitService} from "../../../_services/project/commitService";
import {CreateCommitRequest} from "../../../_dtos/project/CreateCommitRequest";

@Component({
  selector: 'app-create-commit',
  templateUrl: './create-commit.component.html',
  styleUrls: ['./create-commit.component.scss']
})
export class CreateCommitComponent implements OnInit {

  commitExec : boolean = false;

  constructor(protected ref: NbDialogRef<CreateCommitComponent>, private commitService: CommitService) { }

  ngOnInit(): void {
  }


  createCommit() {
    const commitRequest = new CreateCommitRequest(( document.getElementById('commitName') as HTMLInputElement).value);
    this.commitExec = true;
    const branchId: string = localStorage.getItem('branchId');
    this.commitService.create(+branchId, commitRequest).subscribe(
      () => {},
      () => {},
      () => {
        localStorage.setItem("commit", 'true'); this.ref.close();
      }
    );
  }

  getCommitExec(): boolean {
    return this.commitExec;
  }

  close() {
    this.ref.onClose.subscribe(
      () => this.getCommitExec(),
      () => {},
      () => localStorage.setItem("commit", 'false'));
  }
}
