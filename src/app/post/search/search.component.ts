import { Component, OnInit } from '@angular/core'
import { PostService } from '../../_services/post/post.service'
import { PostFilterRequest } from '../../_dtos/post/PostFilterRequest'
import { Post } from '../../_dtos/post/Post'
import { DatePipe } from '@angular/common'
import { User } from '../../_dtos/user/User'
import { SearchFilter } from '../../_dtos/post/Search/SearchFilter'
import { Filters } from '../../_dtos/post/Search/Filters'
import {NbGlobalPhysicalPosition, NbToastrService} from "@nebular/theme";
import {TokenStorageService} from "../../_services/token/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  titleToggle = true
  contentToggle = false
  tagToggle = false
  creationDateToggle = false

  filter = new PostFilterRequest()
  postsFound: Post[]

  userFirstName: string
  usersFound: User[]

  positions = NbGlobalPhysicalPosition;


  constructor(private postService: PostService,
              private datePipe: DatePipe,
              private nbToasterService: NbToastrService,
              private tokenStorage: TokenStorageService,
              private router: Router) {}

  ngOnInit(): void {}

  searchPost() {
    this.postService.getAllByFilters(this.checkFilterValue()).subscribe(
      posts => {
        this.postsFound = posts;
      },
      () => {
        this.nbToasterService.show('We have a problem retry later', `Oopss`, {
          position: this.positions.TOP_RIGHT,
          status: 'danger',
          icon: 'alert-triangle-outline'
        });
      },
      () => {
        if(this.postsFound.length <= 0){
          this.nbToasterService.show('No post Found', `Search`, {
            position: this.positions.TOP_RIGHT,
            status: 'info',
            icon: 'info-outline'
          });
        }
      }
    );
  }

  checkFilterValue() {
    const filters = []

    if (this.filter.title) {
      filters.push(new SearchFilter('title', 4, this.filter.title, ['']))
    }
    if (this.filter.content) {
      filters.push(new SearchFilter('content', 4, this.filter.content, ['']))
    }
    if (this.filter.tagName) {
      filters.push(new SearchFilter('tags', 4, '', [this.filter.tagName]))
    }

    return new Filters(filters)
  }

  searchUser() {
    this.postService.getUserByFirstName(this.userFirstName).subscribe(
      users => {
        this.usersFound = users;
      },
      () => {
        this.nbToasterService.show('We have a problem retry later', `Oopss`, {
          position: this.positions.TOP_RIGHT,
          status: 'danger',
          icon: 'alert-triangle-outline'
        });
      },
      () => {
        if(this.usersFound.length <= 0){
          this.nbToasterService.show('No user Found', ``, {
            position: this.positions.TOP_RIGHT,
            status: 'info',
            icon: 'info-outline'
          });
        }
      }
    );
  }

  OLDcheckFilterValue() {
    // tslint:disable-next-line:no-unused-expression
    this.filter.title === undefined ? (this.filter.title = '') : this.filter.title
    // tslint:disable-next-line:no-unused-expression
    this.filter.content === undefined ? (this.filter.content = '') : this.filter.content
    // tslint:disable-next-line:no-unused-expression
    this.filter.tagName === undefined ? (this.filter.tagName = '') : this.filter.tagName

    if (this.filter.creationDate === undefined) {
      this.filter.creationDate = this.dateToString(new Date(1900, 1, 1, 0, 0, 0))
    } else {
      this.filter.creationDate += ' 00:00:00'
    }
  }

  dateToString(date: Date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd 00:00:00')
  }

  goToFriendPage(friendId: number) {
    if (friendId == this.tokenStorage.getUser().id) {
      this.router.navigate(['/profile']).then();
    } else {
      this.router.navigate(['friend/' + friendId + '/' + 'profile']).then();
    }
  }


}
