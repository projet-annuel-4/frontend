import {NbDialogRef} from "@nebular/theme";
import {Component} from "@angular/core";


@Component({
  template: `
    <nb-card class="dialog-card">
      <nb-card-header>
        <h6>Post deletion</h6>
      </nb-card-header>

      <nb-card-body style="text-align: center; padding-bottom: 0;">
        <p>You are going to delete a post</p>
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

export class DeletePostDialogComponent {

  constructor(protected ref: NbDialogRef<DeletePostDialogComponent>) {}

  delete(){
    this.ref.close(true);
  }

  cancel() {
    this.ref.close();
  }

}
