import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NbDialogRef, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { FileService } from '../../../_services/project/fileService';
import { CreateFileRequest } from '../../../_dtos/project/CreateFileRequest';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import {BranchService} from '../../../_services/project/branchService';
import {CreateBranchRequest} from "../../../_dtos/project/CreateBranchRequest";

@Component({
  selector: 'app-create-branch',
  templateUrl: './create-branch.component.html',
  styleUrls: ['./create-branch.scss'],
})
export class CreateBranchComponent implements OnInit {
  @Input() projectId;
  positions = NbGlobalPhysicalPosition;

  constructor(
    protected ref: NbDialogRef<CreateBranchComponent>,
    private branchService: BranchService,
    private route: ActivatedRoute,
    private nbToasterService: NbToastrService
  ) {}

  ngOnInit(): void {}

  createBranch() {
    const branchRequest = new CreateBranchRequest(
      (document.getElementById('createBranchName') as HTMLInputElement).value
    );
    this.branchService.create(this.projectId, branchRequest).subscribe(
      data => {
        localStorage.setItem('createBranch', JSON.stringify(data));
      },
      error => {
        this.nbToasterService.show(error.error.message, `Error`, {
          position: this.positions.TOP_RIGHT,
          status: 'danger',
        });
        return;
      },
      () => {
        this.nbToasterService.show('Branch has been saved successfully', `Done`, {
          position: this.positions.TOP_RIGHT,
          status: 'success',
        });
        delay(2000);
        this.ref.close();
      }
    );
  }

  close() {
    this.ref.close();
  }
}
