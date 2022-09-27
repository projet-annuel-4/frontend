import {NbDialogRef} from "@nebular/theme";
import {Component} from "@angular/core";
import {TokenStorageService} from "../../_services/token/token-storage.service";
import {Router} from "@angular/router";


@Component({

  //TODO : embellir en despi

  template: `
    <nb-card class="dialog-card" style="padding-left: 50px; padding-right: 50px">
      <nb-card-header style="padding-left: 50px; padding-right: 50px">
        <h5>Logout</h5>
      </nb-card-header>

      <nb-card-body style="padding-left: 50px; padding-right: 50px">
        <p>Are you sure ?</p>
      </nb-card-body>

      <nb-card-footer>
        <button nbButton
                size="tiny"
                (click)="logout()"> Yes
        </button>
        <button nbButton
                size="tiny"
                status="danger"
                (click)="cancel()"> Cancel
        </button>
      </nb-card-footer>
    </nb-card>
  `,
})

export class LogoutDialogComponent {

  constructor(protected ref: NbDialogRef<LogoutDialogComponent>, private tokenStorageService: TokenStorageService,
              private router: Router ) {
  }

  logout(){
    this.tokenStorageService.signOut();
    this.router.navigate(['auth/signing']).then(() => {
      window.location.reload();
    })
  }

  cancel(){
    this.ref.close();
  }



}
