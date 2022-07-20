import { Component, OnInit } from '@angular/core';
import {PostService} from "../../_services/post/post.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  //TODO : Implementer la recherche

  titleToggle = false;
  contentToggle: boolean = false;
  tagToggle: boolean = false;
  creationDateToggle: boolean = false;

  constructor(private postService: PostService) { }

  ngOnInit(): void {

  }

  search(){
    alert("lets go");
  }





}
