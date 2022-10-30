import { Component, Input, OnInit } from '@angular/core'
import { Group } from '../../_dtos/group/Group'
import { Router } from '@angular/router'
import {GroupService} from "../../_services/group/group.service";
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {TokenStorageService} from "../../_services/token/token-storage.service";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-group-card',
  templateUrl: './group-card.component.html',
  styleUrls: ['./group-card.component.scss'],
})
export class GroupCardComponent implements OnInit {
  @Input() group: Group

  positions = NbGlobalPhysicalPosition;

  constructor(private router: Router,
              private groupService: GroupService,
              private nbToasterService: NbToastrService,
              public tokenStorage: TokenStorageService) {}

  ngOnInit(): void {}

  goTo(groupId: number): void {
    this.router.navigate(['/group/', groupId]).then()
  }

  deleteGroup(groupId: number){
    this.groupService.delete(groupId).subscribe(
      then => {},
      error => {},
      () => {
        this.nbToasterService.show('Group deleted successfully', `Confirm`, {
          position: this.positions.TOP_RIGHT,
          status: 'success',
        });
        setTimeout(()=> {
          window.location.reload();
        }, 1000);
      },
    );
  }
}
