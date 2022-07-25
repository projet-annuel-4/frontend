import {Component, OnInit, Output, EventEmitter, Input, OnChanges} from '@angular/core';
import {Filess} from "../../../_dtos/project/Filess";
import {FileService} from "../../../_services/project/fileService";

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

  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.loadFiles();
  }

  ngOnChanges(changes) {
  }

  loadFiles() {
    const promise = this.fileService.getAllFileFromBranch(this.branchId).toPromise();
    promise.then((data) => {this.files = data})
      .catch(() => alert('une erreur est survenue'));
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
      if (confirm('le fichier a été modifié, si vous changer de fichier les donnés seront perdues, etes vous sur ?')) {
        return this.fileSelectedEvent.emit(file);
      }
    } else {
      this.fileSelectedEvent.emit(file);
    }
  }
}
