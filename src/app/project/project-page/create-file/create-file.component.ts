import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {NbDialogRef} from "@nebular/theme";
import {CommitService} from "../../../_services/project/commitService";
import {CreateCommitRequest} from "../../../_dtos/project/CreateCommitRequest";
import {FileService} from "../../../_services/project/fileService";
import {CreateFileRequest} from "../../../_dtos/project/CreateFileRequest";
import {ActivatedRoute, Params, Route, Router} from "@angular/router";
import {ProjectTreeComponent} from "../project-tree/project-tree.component";
import {delay} from "rxjs/operators";
import {Error} from "../../../_dtos/Error";

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
        alert('le fichier à bien été créer');
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
