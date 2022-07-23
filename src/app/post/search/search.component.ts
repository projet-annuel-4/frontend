import { Component, OnInit } from '@angular/core';
import {PostService} from "../../_services/post/post.service";
import {PostFilterRequest} from "../../_dtos/post/PostFilterRequest";
import {Post} from "../../_dtos/post/Post";
import {DatePipe} from "@angular/common";
import {User} from "../../_dtos/user/User";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  titleToggle = true;
  contentToggle: boolean = true;
  tagToggle: boolean = true;
  creationDateToggle: boolean = true;

  filter = new PostFilterRequest();

  postsFound: Post[];

  userFound: User[];

  constructor(private postService: PostService, private datePipe: DatePipe) { }

  ngOnInit(): void {

  }

  search(){
    /*
    if(this.filter.title === undefined && this.filter.content === undefined
      && this.filter.tagName === undefined && this.filter.creationDate === undefined){
      alert("One params min");
      return;
    }
     */
    if(this.filter.title === undefined || this.filter.content === undefined
      || this.filter.tagName === undefined || this.filter.creationDate === undefined){
      alert("All params are required");
      return;
    }

    this.checkFilterValue();

    this.postService.getAllWithFilters(this.filter).subscribe(posts => {
      this.postsFound = posts;
    });
  }


  checkFilterValue(){
    this.filter.title === undefined ?  this.filter.title = "": this.filter.title;
    this.filter.content === undefined ?  this.filter.content = "": this.filter.content;
    this.filter.tagName === undefined ?  this.filter.tagName = "": this.filter.tagName;

    if (this.filter.creationDate === undefined) {
      this.filter.creationDate = this.dateToString(new Date(1900, 1, 1, 0, 0, 0))
    } else {
      this.filter.creationDate += " 00:00:00";
    }
  }



  //TODO : recherche par user
  searchUser(){

  }


  dateToString(date: Date){
    return this.datePipe.transform(date, 'yyyy-MM-dd 00:00:00');
  }



}
