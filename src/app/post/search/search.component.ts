import { Component, OnInit } from '@angular/core'
import { PostService } from '../../_services/post/post.service'
import { PostFilterRequest } from '../../_dtos/post/PostFilterRequest'
import { Post } from '../../_dtos/post/Post'
import { DatePipe } from '@angular/common'
import { User } from '../../_dtos/user/User'
import { SearchFilter } from '../../_dtos/post/Search/SearchFilter'
import { Filters } from '../../_dtos/post/Search/Filters'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  titleToggle = true
  contentToggle: boolean = false
  tagToggle: boolean = false
  creationDateToggle: boolean = false

  filter = new PostFilterRequest()
  postsFound: Post[]

  userFirstname: string
  usersFound: User[]

  constructor(private postService: PostService, private datePipe: DatePipe) {}

  ngOnInit(): void {}

  searchPost() {
    this.postService.getAllByFilters(this.checkFilterValue()).subscribe(posts => {
      this.postsFound = posts
    })
  }

  checkFilterValue() {
    const filters = []

    if (this.filter.title) filters.push(new SearchFilter('title', 4, this.filter.title, ['']))
    if (this.filter.content) filters.push(new SearchFilter('content', 4, this.filter.content, ['']))
    if (this.filter.tagName) filters.push(new SearchFilter('tags', 4, '', [this.filter.tagName]))

    return new Filters(filters)
  }

  searchUser() {
    this.postService.getUserByFirstname(this.userFirstname).subscribe(user => {
      this.usersFound = user
    })
  }

  OLDcheckFilterValue() {
    this.filter.title === undefined ? (this.filter.title = '') : this.filter.title
    this.filter.content === undefined ? (this.filter.content = '') : this.filter.content
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
}
