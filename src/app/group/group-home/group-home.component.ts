import { Component, OnInit } from '@angular/core';
import {Group} from "../../_dtos/group/Group";

@Component({
  selector: 'app-group-home',
  templateUrl: './group-home.component.html',
  styleUrls: ['./group-home.component.scss']
})
export class GroupHomeComponent implements OnInit {

  groups: Group[] = [ new Group(1, "coucou", []) , new Group(2, "coucou2", []), new Group(3, "couco3", [])];

  constructor() { }

  ngOnInit(): void {
  }

}
