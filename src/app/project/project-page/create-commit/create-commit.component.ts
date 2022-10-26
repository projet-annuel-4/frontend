import {Component, Input, OnInit} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { CommitService } from '../../../_services/project/commitService';
import { CreateCommitRequest } from '../../../_dtos/project/CreateCommitRequest';

@Component({
  selector: 'app-create-commit',
  templateUrl: './create-commit.component.html',
  styleUrls: ['./create-commit.component.scss'],
})
export class CreateCommitComponent implements OnInit {
  commitExec = false;
  @Input() projectId;
  constructor(
    protected ref: NbDialogRef<CreateCommitComponent>,
    private commitService: CommitService
  ) {}

  ngOnInit(): void {}

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
        this.ref.close();
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
      () => localStorage.setItem('commit', 'false')
    );
  }
}
