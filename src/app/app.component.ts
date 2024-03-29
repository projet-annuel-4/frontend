import {Component, Inject, OnInit} from '@angular/core';
import {NB_WINDOW, NbDialogService, NbMenuService, NbThemeService} from '@nebular/theme';
import {TokenStorageService} from './_services/token/token-storage.service';
import {Router} from '@angular/router';
import {User} from './_dtos/user/User';
import {LogoutDialogComponent} from './shared/dialog/logout-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  styles: [
    `
      :host nb-layout-header ::ng-deep nav {
        justify-content: flex-end;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  title = 'frontend';

  toggleTheme = false;

  user: User;

  items = [{ title: 'Logout', icon: 'unlock-outline' }];

  constructor(
    private nbMenuService: NbMenuService,
    @Inject(NB_WINDOW) private window,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private dialogService: NbDialogService,
    private themeService: NbThemeService
  ) {}

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();

    this.nbMenuService.onItemClick().subscribe(title => {
      switch (title.item.title) {
        /*
        case 'Profile':
          this.router.navigate(['../profile']).then();
          break;
        case 'Group':
          this.router.navigate(['../group']).then();
          break;

        case 'Search':
          this.router.navigate(['../post/search']).then();
          break;

        case 'Chat':
          this.router.navigate(['../chat/']).then();
          break;

        case 'Feed':
          this.router.navigate(['../post/feed']).then();
          break;

         */

        case 'Logout':
          this.dialogService.open(LogoutDialogComponent);
          break;

        default:
          throw new Error();
      }
    });
  }

  changeTheme() {
    // https://akveo.github.io/nebular/docs/components/toggle/overview#nbtogglecomponent

    this.toggleTheme = !this.toggleTheme;

    if (this.toggleTheme) {
      this.themeService.changeTheme('dark');
    } else {
      this.themeService.changeTheme('default');
    }
  }

  logOut() {
    this.dialogService.open(LogoutDialogComponent);
  }
}
