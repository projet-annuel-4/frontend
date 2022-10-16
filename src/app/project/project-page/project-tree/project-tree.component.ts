import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core'
import { Files } from '../../../_dtos/project/Filess'
import { FileService } from '../../../_services/project/fileService'
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme'
import { FileUnsavedChangeComponent } from '../../../shared/dialog/file-unsaved-change.component'

@Component({
  selector: 'app-project-tree',
  templateUrl: './project-tree.component.html',
  styleUrls: ['./project-tree.component.css'],
})
export class ProjectTreeComponent implements OnInit, OnChanges {
  @Output() fileSelectedEvent = new EventEmitter<Files>()
  @Input() fileChange
  @Input() projectId

  files: Files[]

  customColumn = 'name'
  allColumns = [this.customColumn]

  positions = NbGlobalPhysicalPosition

  constructor(
    private fileService: FileService,
    private nbToasterService: NbToastrService,
    private dialogService: NbDialogService
  ) {}

  ngOnInit(): void {
    this.loadFiles()
  }

  ngOnChanges(changes) {}

  loadFiles() {
    const promise = this.fileService.getAllFileFromProject(this.projectId).toPromise()
    promise
      .then(data => {
        this.files = data
        console.log(data)
      })
      .catch(() =>
        this.nbToasterService.show('An error has occurred', `Error`, {
          position: this.positions.TOP_RIGHT,
          status: 'danger',
        })
      )
  }

  updateFiles() {
    setTimeout(() => {
      this.loadFiles()
      const fileObj: Files = JSON.parse(localStorage.getItem('createdFile'))
      this.files.push(fileObj)
      localStorage.removeItem('createdFile')
    }, 600)
  }

  uppdateFilesV2() {
    this.loadFiles()
  }

  setSelectedFileEvent(value: number) {
    let file: Files
    for (let i = 0; i < this.files.length; i++) {
      if (this.files[i].id === value) {
        file = this.files[i]
      }
    }
    console.log('ici : ' + this.fileChange)
    if (this.fileChange) {
      this.dialogService.open(FileUnsavedChangeComponent).onClose.subscribe(confirmation => {
        if (confirmation) {
          return this.fileSelectedEvent.emit(file)
        }
      })
    } else {
      this.fileSelectedEvent.emit(file)
    }
  }
}
