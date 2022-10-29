import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {CommitService} from '../../../_services/project/commitService';
import {Commit} from '../../../_dtos/project/Commit';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-revert-commit',
  templateUrl: './revert-commit.component.html',
  styleUrls: ['./revert-commit.component.css'],
})
export class RevertCommitComponent implements OnInit {
  @Input() projectId;
  commits: Commit[];
  commitId: string;
  positions = NbGlobalPhysicalPosition;

  constructor(
    protected ref: NbDialogRef<RevertCommitComponent>,
    private commitService: CommitService,
    private route: ActivatedRoute,
    private nbToasterService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.loadCommit();
  }

  loadCommit(): void {
    this.commitService.getAllCommit(this.projectId).subscribe(
      data => (this.commits = data),
      () => {},
      () => {
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
    if (this.commitId && this.commitId !== '') {
      const commitId = localStorage.getItem('commitId');
      console.log('commit : ' + commitId);
      this.commitService.revert(this.projectId, this.commitId).subscribe(
        () => {
        },
        () => {
        },
        () => {
          this.nbToasterService.show('You need to check a commit', `Revert warning`, {
            position: this.positions.TOP_RIGHT,
            status: 'warning',
          });
          //window.location.reload();
        }
      );

      this.ref.close();
    } else {
      this.nbToasterService.show('Project has been revert', `Done`, {
        position: this.positions.TOP_RIGHT,
        status: 'success',
      });
    }
  }

  checkInput(id: string) {
    this.commitId = id.toString();
    const checkbox = document.getElementsByClassName(
      'commitCheckBox'
    ) as HTMLCollectionOf<HTMLInputElement>;
    for (let i = 0; i < checkbox.length; i++) {
      checkbox[i].checked = false;
    }
    (document.getElementById('commit_' + id) as HTMLInputElement).checked = true;
  }

  close() {
    this.ref.close();
  }
}
