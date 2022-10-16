import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { CommitService } from '../../../_services/project/commitService'
import { FileService } from '../../../_services/project/fileService'

@Component({
  selector: 'app-action-panel',
  templateUrl: './action-panel.component.html',
  styleUrls: ['./action-panel.component.css'],
})
export class ActionPanelComponent implements OnInit {
  @Output() saveEvent = new EventEmitter<any>()

  constructor(private commitService: CommitService, private fileService: FileService) {}

  ngOnInit(): void {}

  saveFile() {
    this.saveEvent.emit()
  }
}
