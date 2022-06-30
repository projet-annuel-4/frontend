import {Component, Inject, OnInit} from '@angular/core';
import {NB_WINDOW, NbDialogService, NbMenuService} from "@nebular/theme";
import {TokenStorageService} from "./_services/token/token-storage.service";
import {Router} from "@angular/router";
import {DialogSuccessComponent} from "./shared/dialog/dialog-alert/dialog-success.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  styles: [`
    :host nb-layout-header ::ng-deep nav {
      justify-content: flex-end;
    }
  `],

})
export class AppComponent implements OnInit{
  title = 'frontend';

  items = [
    { title: 'Profile' },
    { title: 'Logout' },
  ];


  constructor(private nbMenuService: NbMenuService, @Inject(NB_WINDOW) private window,
              private tokenStorageService: TokenStorageService, private router: Router,
              private dialogService: NbDialogService) {}

  ngOnInit(): void {
    this.nbMenuService.onItemClick()
      .subscribe(title => {

        switch (title.item.title) {
          case 'Profile':
            this.router.navigate(['../profile']).then();
            break;

          case 'Logout':
            confirm("Sure ?");
            this.tokenStorageService.signOut();
            this.router.navigate(['auth/signing']).then();
            break;

          default:
            throw new Error();
        }
      });
  }

}
