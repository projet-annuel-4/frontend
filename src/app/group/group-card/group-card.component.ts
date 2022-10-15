import { Component, Input, OnInit } from '@angular/core'
import { Group } from '../../_dtos/group/Group'
import { Router } from '@angular/router'

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
})
export class GroupCardComponent implements OnInit {
  @Input() group: Group

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goTo(groupId: number): void {
    this.router.navigate(['/group/', groupId]).then()
  }
}
