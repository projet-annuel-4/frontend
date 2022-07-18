import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../../_services/auth/auth.service";
import {Router} from "@angular/router";
import {NbDialogService} from "@nebular/theme";
import {SignUpRequest} from "../../_dtos/auth/SignUpRequest";
import {UserService} from "../../_services/user/user.service";
import {UserUpdateRequest} from "../../_dtos/user/UserUpdateRequest";
import {FileManagementService} from "../../_services/file-management/file-management.service";
import {FileRequest} from "../../_dtos/file/FileRequest";

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {

  signUpFrom: FormGroup;
  file: File;

  constructor(private authService: AuthService, private formBuilder: FormBuilder,
              private userService: UserService, private router: Router,
              private fileManagementService: FileManagementService) {
    this.signUpFrom = this.formBuilder.group({
      imgUrl: [],
      firstname: [],
      lastname: []
    });
  }

  ngOnInit(): void {
  }

  update() {
    if (this.signUpFrom.valid) {

      this.onUpload();

      const data = this.signUpFrom.value;
      //this.loading = true;
      this.userService.update(new UserUpdateRequest(data['firstname'], data['lastname'],
        data['imgUrl'])).subscribe(
        response => {
          //this.loading = true;
          console.log("subscribe");
          this.router.navigate(['../profile']).then()
        }
      );

    } else {
      alert("All fields must be completed");
    }

  }


  onChange(event) {
    this.file = event.target.files[0];
  }


  onUpload(){
    console.log("file.name : " + this.file.name);
    console.log("file.type : " + this.file.type);
    console.log("file.size : " + this.file.size);
    console.log("file.lastModified : " + this.file.lastModified);

    if(this.file.type != "image/png" && this.file.type != "image/jpg"
      && this.file.type != "image/jpeg"){
      alert("Type of photo accepted : .png, .jpg, .jpeg");
      return;
    }

    //TODO : Upload la photo de profile
    this.fileManagementService.uploadFile(new FileRequest(null, null, this.file.name, "", "", ""),
                                            this.file).subscribe(then => {
      console.log("image uploade (askip)");
    });

  }
}
