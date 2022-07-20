import { Component, OnInit } from '@angular/core';
import {PostService} from "../../_services/post/post.service";
import {PostFilterRequest} from "../../_dtos/post/PostFilterRequest";
import {Post} from "../../_dtos/post/Post";

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


  filter: PostFilterRequest;


  postFound: Post[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {

  }

  search(){
    alert("lets go");
    this.postService.getAllWithFilters(this.filter).subscribe(posts => {
      //TODO : Afficher les posts trouvés
      this.postFound = posts;

      this.postFound.forEach(post => console.log(post.id));
    });
  }





}
