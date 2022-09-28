import {Component, OnInit, Output, EventEmitter, Input, OnChanges} from '@angular/core';
import {Filess} from "../../../_dtos/project/Filess";
import {FileService} from "../../../_services/project/fileService";
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {DeleteFileDialogComponent} from "../../../shared/dialog/delete-file-dialog.component";
import {FileUnsavedChangeComponent} from "../../../shared/dialog/file-unsaved-change.component";

@Component({
  selector: 'app-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.css']
})
export class ProjectTreeComponent implements OnInit, OnChanges {

  @Output() fileSelectedEvent = new EventEmitter<Filess>();
  @Input() filechange;
  @Input() branchId;

  files: Filess[];

  customColumn = 'name';
  allColumns = [ this.customColumn ];

  positions = NbGlobalPhysicalPosition;

  constructor(private fileService: FileService, private nbToasterService:NbToastrService,
              private dialogService: NbDialogService) { }

  ngOnInit(): void {
    this.loadFiles();
  }

  ngOnChanges(changes) {
  }

  loadFiles() {
    const promise = this.fileService.getAllFileFromBranch(this.branchId).toPromise();
    promise.then((data) => {this.files = data})
      .catch(() => this.nbToasterService.show('An error has occurred', `Error`, { position:this.positions.TOP_RIGHT, status:"danger" }));
  }

  uppdateFiles() {
    setTimeout(() => {
      this.loadFiles();
      const fileObj: Filess = JSON.parse(localStorage.getItem('createdFile'));
      this.files.push(fileObj);
      localStorage.removeItem('createdFile');
    }, 600);
  }

  uppdateFilesV2() {
      this.loadFiles();
  }

  setSelectedFileEvent(value: number) {
    let file: Filess;
    for ( let i = 0; i < this.files.length; i++) {
      if (this.files[i].id === value) {
        file = this.files[i];
      }
    }
    console.log("ici : " + this.filechange);
    if (this.filechange) {

      this.dialogService.open(FileUnsavedChangeComponent).onClose.subscribe(confirmation => {
        if (confirmation) return this.fileSelectedEvent.emit(file);
      });

    } else {
      this.fileSelectedEvent.emit(file);
    }
  }
}
