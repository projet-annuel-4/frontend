import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
import {ActivatedRoute} from '@angular/router';
import {BranchService} from '../../../_services/project/branchService';

@Component({
  selector: 'app-merge-branch',
  templateUrl: './merge-branch.component.html',
  styleUrls: ['./merge-branch.component.css'],
})
export class MergeBranchComponent implements OnInit {
  @Input() projectId;
  @Input() branchList;
  @Input() actualBranch;
  selectedBranch: string;
  positions = NbGlobalPhysicalPosition;

  constructor(
    protected ref: NbDialogRef<MergeBranchComponent>,
    private branchService: BranchService,
    private route: ActivatedRoute,
    private nbToasterService: NbToastrService
  ) {
  }

  ngOnInit(): void {
  }

  mergeBranch() {
    if (this.selectedBranch && this.selectedBranch !== '') {
      this.branchService.merge(this.projectId, this.selectedBranch).subscribe(
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

  close() {
    this.ref.close();
  }
}
