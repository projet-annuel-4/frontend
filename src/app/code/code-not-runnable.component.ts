import { Component } from '@angular/core'
import { NbDialogRef } from '@nebular/theme'

@Component({
  template: `
    <nb-card class="dialog-card">
      <nb-card-header>Your code is not runnable</nb-card-header>
      <nb-card-body> Post Anyway ? </nb-card-body>
      <nb-card-footer class="text-center">
        <button nbButton (click)="createPost()" status="primary" class="m-2">Continue</button>
        <button nbButton (click)="cancel()" status="danger" class="m-2">Cancel</button>
      </nb-card-footer>
    </nb-card>
  `,
})
export class CodeNotRunnableComponent {
  constructor(protected ref: NbDialogRef<CodeNotRunnableComponent>) {}

  cancel() {
    this.ref.close()
  }

  createPost() {
    this.ref.close()
  }
}
