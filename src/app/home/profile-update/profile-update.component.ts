import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { AuthService } from '../../_services/auth/auth.service'
import { Router } from '@angular/router'
import { UserService } from '../../_services/user/user.service'
import { UserUpdateRequest } from '../../_dtos/user/UserUpdateRequest'
import { FileManagementService } from '../../_services/file-management/file-management.service'
import { ImageRequest } from '../../_dtos/image/ImageRequest'
import { User } from '../../_dtos/user/User'
import { TokenStorageService } from '../../_services/token/token-storage.service'
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme'

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss'],
})
export class ProfileUpdateComponent implements OnInit {
  user: User

  signUpFrom: FormGroup
  file: File

  positions = NbGlobalPhysicalPosition

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private nbToasterService: NbToastrService,
    private fileManagementService: FileManagementService,
    private tokenStorage: TokenStorageService
  ) {
    this.signUpFrom = this.formBuilder.group({
      imgUrl: [],
      firstName: [],
      lastName: [],
    })
  }

  ngOnInit(): void {
    this.user = this.userService.getProfile()
  }

  update() {
    if (this.signUpFrom.valid) {
      if (this.file !== undefined) this.onUpload()

      const data = this.signUpFrom.value
      //this.loading = true;
      console.log("-- Data --");
      console.log(data['firstName'], data['lastName'], data['imgUrl'])

      this.userService
        .update(new UserUpdateRequest(data['firstName'], data['lastName'], data['imgUrl']))
        .subscribe(
          response => {
            //this.loading = true;
            },
          error => {
            this.nbToasterService.show(error['firstNameError'], `Error`, {
              position: this.positions.TOP_RIGHT,
              status: 'danger',
            })
          },
          () => {
            this.router.navigate(['../profile']).then()
          }
        )
    } else {
      this.nbToasterService.show('All fields must be completed', ``, {
        position: this.positions.TOP_RIGHT,
        status: 'danger',
      })
    }
  }

  onChange(event) {
    this.file = event.target.files[0]
  }

  onUpload() {
    if (
      this.file.type != 'image/png' &&
      this.file.type != 'image/jpg' &&
      this.file.type != 'image/jpeg'
    ) {
      this.nbToasterService.show('Type of photo accepted : .png, .jpg, .jpeg', ``, {
        position: this.positions.TOP_RIGHT,
        status: 'warning',
      })
      return
    }

    const imageRequest = new ImageRequest(
      this.file.type,
      'profile',
      this.user.id.toString(),
      'null'
    )

    this.fileManagementService.uploadImage(imageRequest, this.file).subscribe(imageUrl => {
      let user = this.tokenStorage.getUser()
      user.imgUrl = imageUrl
      this.tokenStorage.saveUser(user)
    })
  }
}
