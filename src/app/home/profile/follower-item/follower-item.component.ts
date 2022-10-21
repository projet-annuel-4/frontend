import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../_dtos/user/User';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../_services/token/token-storage.service';

@Component({
  selector: 'app-follower-item',
  templateUrl: './follower-item.component.html',
  styleUrls: ['./follower-item.component.scss']
})
export class FollowerItemComponent implements OnInit {

  @Input()
  follower: User;

  name: string;

  constructor(private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.name = this.follower.firstname + ' ' + this.follower.lastname;
  }

  goToFriendPage() {
    if (this.follower.id == this.tokenStorage.getUser().id) {
      this.router.navigate(['/profile']).then();
    } else {
      this.router.navigate(['friend/' + this.follower.id + '/' + 'profile']).then();
    }
  }
}
