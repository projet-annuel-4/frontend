import { NbDialogRef } from '@nebular/theme'
import { Component } from '@angular/core'
import { TokenStorageService } from '../../_services/token/token-storage.service'
import { Router } from '@angular/router'

@Component({
  template: `
    <nb-card class="dialog-card">
      <nb-card-header>
        <h6>Logout</h6>
      </nb-card-header>

      <nb-card-body style="text-align: center; padding-bottom: 0;">
        <p>Are you sure ?</p>
      </nb-card-body>

      <nb-card-footer>
        <span style="padding-right: 50px">
          <button nbButton size="tiny" (click)="logout()">Yes</button>
        </span>
        <span>
          <button nbButton size="tiny" status="danger" (click)="cancel()">Cancel</button>
        </span>
      </nb-card-footer>
    </nb-card>
  `,
})
export class LogoutDialogComponent {
  constructor(
    protected ref: NbDialogRef<LogoutDialogComponent>,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  logout() {
    this.tokenStorageService.signOut()
    this.router.navigate(['auth/signing']).then(() => {
      window.location.reload()
    })
  }

  cancel() {
    this.ref.close()
  }
}
