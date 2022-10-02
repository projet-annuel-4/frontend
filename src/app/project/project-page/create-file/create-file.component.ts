import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NbDialogRef, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {FileService} from "../../../_services/project/fileService";
import {CreateFileRequest} from "../../../_dtos/project/CreateFileRequest";
import {ActivatedRoute, Params, Route, Router} from "@angular/router";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-create-file',
  templateUrl: './create-file.component.html',
  styleUrls: ['./create-file.component.scss']
})
export class CreateFileComponent implements OnInit {

  positions = NbGlobalPhysicalPosition;

  constructor(protected ref: NbDialogRef<CreateFileComponent>, private fileService: FileService,
              private route: ActivatedRoute, private nbToasterService:NbToastrService) { }

  ngOnInit(): void {
  }


  createFile() {
    const fileRequest = new CreateFileRequest((document.getElementById('createFileName') as HTMLInputElement).value);
    const branchId: string = localStorage.getItem('branchId');
    this.fileService.create(+branchId, fileRequest).subscribe(
      (data) => {localStorage.setItem('createdFile', JSON.stringify(data))},
      (error) => {
        this.nbToasterService.show(error.error.message, `Error`, { position:this.positions.TOP_RIGHT, status:"danger" })
        return
      },
      () => {
        this.nbToasterService.show('File has been saved successfully', `Done`, { position:this.positions.TOP_RIGHT, status:"success" })
        localStorage.removeItem('branchId');
        delay(2000);
        this.ref.close();
      },
    );

  }

  close() {
    this.ref.close();
  }

}
