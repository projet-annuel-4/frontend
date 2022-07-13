import { Component, OnInit } from '@angular/core';
import {User} from "../../../_dtos/user/User";

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {

  subscriptions: User[];

  constructor() { }

  ngOnInit(): void {

    //TODO : Call API for subscriptions

    const subscriptionsMock = [
      new User(1, "Jean1", "Mock", "jean.mock@gmail.com", 12, 5, "http://profile-image.oui"),
      new User(2, "Jean2", "Mock", "jean.mock@gmail.com", 12, 5,  "http://profile-image.oui"),
      new User(3, "Jean3", "Mock", "jean.mock@gmail.com", 12, 5,  "http://profile-image.oui"),
      new User(4, "Jean4", "Mock", "jean.mock@gmail.com", 12, 5,  "http://profile-image.oui"),
      new User(5, "Jean5", "Mock", "jean.mock@gmail.com", 12, 5,  "http://profile-image.oui"),
      new User(6, "Jean6", "Mock", "jean.mock@gmail.com", 12, 5,  "http://profile-image.oui"),
      new User(7, "Jean7", "Mock", "jean.mock@gmail.com", 12, 5,  "http://profile-image.oui"),
    ];


    this.subscriptions = subscriptionsMock;

  }

}
