import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
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


  constructor(protected ref: NbDialogRef<CreateFileComponent>, private fileService: FileService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
  }


  createFile() {
    const fileRequest = new CreateFileRequest((document.getElementById('createFileName') as HTMLInputElement).value);
    const branchId: string = localStorage.getItem('branchId');
    this.fileService.create(+branchId, fileRequest).subscribe(
      (data) => {localStorage.setItem('createdFile', JSON.stringify(data))},
      (error) => { alert(error.error.message); return},
      () => {
        alert('File has been saved successfully');
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
