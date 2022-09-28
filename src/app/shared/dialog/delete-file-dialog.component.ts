import {NbDialogRef} from "@nebular/theme";
import {Component} from "@angular/core";


@Component({
  template: `
    <nb-card class="dialog-card">
      <nb-card-header>
        <h6>Unsaved change</h6>
      </nb-card-header>

      <nb-card-body style="text-align: center; padding-bottom: 0;">
        <p>
          The file has been modified, if you change the file the data will be lost,
          are you sure?
        </p>
      </nb-card-body>

      <nb-card-footer>
        <span style="padding-right: 50px">
          <button nbButton
                  size="tiny"
                  (click)="delete()"> delete
          </button>
        </span>
        <span>
          <button nbButton
                  size="tiny"
                  status="danger"
                  (click)="cancel()"> Cancel
          </button>
        </span>
      </nb-card-footer>
    </nb-card>
  `,
})

export class DeleteFileDialogComponent {

  constructor(protected ref: NbDialogRef<DeleteFileDialogComponent>) {}

  delete(){
    this.ref.close(true);
  }

  cancel() {
    this.ref.close();
  }

}
