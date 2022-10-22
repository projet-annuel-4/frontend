import {Component, Input, Output, EventEmitter, ViewChild, OnChanges, OnInit} from '@angular/core';
import { TreeviewItem, TreeviewConfig} from 'ngx-treeview';
import {FileUnsavedChangeComponent} from '../../../shared/dialog/file-unsaved-change.component';
import {Filess} from '../../../_dtos/project/Filess';
import {FileService} from '../../../_services/project/fileService';
import {NbDialogService, NbGlobalPhysicalPosition, NbToastrService} from '@nebular/theme';
@Component({
  selector: 'app-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.css'],
})
export class ProjectTreeComponent implements OnInit, OnChanges {
  @Output() fileSelectedEvent = new EventEmitter<Filess>();
  @Input() fileChange;
  @Input() projectId;
  files: Filess[] = [];
  customColumn = 'name';
  allColumns = [this.customColumn];
  positions = NbGlobalPhysicalPosition;
  value = 11;
  items: TreeviewItem[];
  config = TreeviewConfig.create({
    hasFilter: true,
    hasCollapseExpand: true
  });

  constructor(
    private fileService: FileService,
    private nbToasterService: NbToastrService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.loadFiles();
  }

  ngOnChanges(): void {
  }



  loadFiles() {
    this.fileService.getAllFileFromProject(this.projectId).toPromise().then(data => {
        this.files = [];
        data.map(value => {
          this.files.push(new Filess(value));
        });
        this.items = this.getRepository(data);
      })
      .catch(() =>
        this.nbToasterService.show('An error has occurred', `Error`, {
          position: this.positions.TOP_RIGHT,
          status: 'danger',
        })
      );

  }

  updateFiles() {
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

  setSelectedFileEvent(value: string) {
    let file: Filess;
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i].name === value) {
        file = this.files[i];
      }
    }
    console.log('ici : ' + this.fileChange);
    if (this.fileChange) {
      this.dialogService.open(FileUnsavedChangeComponent).onClose.subscribe(confirmation => {
        if (confirmation) {
          return this.fileSelectedEvent.emit(file);
        }
      });
    } else {
      this.fileSelectedEvent.emit(file);
    }
  }
  onValueChange(value: number): void {
    console.log('valueChange raised with value: ' + value);
    let file: Filess;
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i].name === value) {
        file = this.files[i];
      }
    }
    this.fileSelectedEvent.emit(file);
  }

  getRepository(data: string[]): TreeviewItem[] {
    console.log(data);
// make tree
    const treeObj = data.reduce((obj, path) => this.addPath(path.split('/'), obj, path), {});

// convert to array
    const arr = this.makeArray(treeObj);


    const treeItem = new TreeviewItem({
      text: 'Project', collapsed: true, children: arr
    });

    return [treeItem];
  }

  addPath(arr, obj = {}, path) {
    const component = arr.shift();
    const current = obj[component] || (obj[component] = {text: component, value: path});
    if (arr.length) {
      this.addPath(arr, current.children || (current.children = {}), path);
    }
    return obj;
  }

  makeArray(obj) {
    const arr = Object.values(obj);
    arr.filter(item => item.children).forEach(item => {
      item.children = this.makeArray(item.children);
    });
    return arr;
  }

}
