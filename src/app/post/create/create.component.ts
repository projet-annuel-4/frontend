import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {PostService} from "../../_services/post/post.service";
import {Post} from "../../_dtos/post/Post";
import {PostRequest} from "../../_dtos/post/PostRequest";
import {Router} from "@angular/router";
import {User} from "../../_dtos/user/User";
import {TokenStorageService} from "../../_services/token/token-storage.service";
import {UserProfile} from "../../_dtos/user/UserProfile";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  user: User;
  postForm: FormGroup;
  content:string;
  code;


  constructor(private formBuilder: FormBuilder, private postService: PostService, private router: Router,
              private tokenStorage: TokenStorageService) {
    this.postForm = this.formBuilder.group({
      title: [],
      content: [],
      tagName: [],
      attachmentUrl: [],
      attachmentDescription: []
    });
  }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser()
  }



  create(){
    if(this.postForm.valid) {
      const data = this.postForm.value;

      console.log("tagName :" + data["tagName"]);

      this.postService.create(new PostRequest(
                        data["title"] == null ? data["title"] = "" : data["title"],
                        data["content"] == null ? data["content"] = "" : data["content"],
                        this.user.id.toString(),
                        data["tagName"] == null ? data["tagName"] = "" : data["tagName"],
                        data["attachmentUrl"] == null ? data["attachmentUrl"] = "" : data["attachmentUrl"],
                        data["attachmentDescription"] == null ? data["attachmentDescription"] = "" : data["attachmentDescription"]))
        .subscribe(then => {
          this.router.navigate(['/profile']).then();
        });
    }

  }


}
