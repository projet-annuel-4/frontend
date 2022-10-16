import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup } from '@angular/forms'
import { PostService } from '../../_services/post/post.service'
import { PostRequest } from '../../_dtos/post/PostRequest'
import { Router } from '@angular/router'
import { User } from '../../_dtos/user/User'
import { TokenStorageService } from '../../_services/token/token-storage.service'
import { NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme'
import { CodeNotRunnableComponent } from '../../code/code-not-runnable.component'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  user: User
  postForm: FormGroup
  content: string
  code

  CODE_RUNNABLE_KEY = 'code-runnable'

  positions = NbGlobalPhysicalPosition

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private dialogService: NbDialogService,
    private nbToasterService: NbToastrService
  ) {
    this.postForm = this.formBuilder.group({
      title: [],
      content: [],
      tagName: [],
      attachmentUrl: [],
      attachmentDescription: [],
    })
  }

  ngOnInit(): void {
    this.user = this.tokenStorage.getUser()
  }

  create() {
    if (this.postForm.valid) {
      const data = this.postForm.value

      let tagsName: string[] = []

      if (data['title'] === null || data['title'] === undefined) {
        this.nbToasterService.show('Title cannot be empty', `Warning`, {
          position: this.positions.TOP_RIGHT,
          status: 'warning',
        })
        return
      }

      if (data['content'] === null) {
        this.nbToasterService.show('Content cannot be empty', `Warning`, {
          position: this.positions.TOP_RIGHT,
          status: 'warning',
        })
        return
      }

      if (data['tagName'] !== null) {
        tagsName = data['tagName'].split(',')
        tagsName.forEach(tagName => tagName.trim())
      }

      if (tagsName.length > 5) {
        this.nbToasterService.show('5 tags max', `Warning`, {
          position: this.positions.TOP_RIGHT,
          status: 'warning',
        })
        return
      }

      // On recupere l'info depuis le composant d'exécution
      if (localStorage.getItem(this.CODE_RUNNABLE_KEY) == 'false') {
        this.dialogService.open(CodeNotRunnableComponent)
        localStorage.removeItem(this.CODE_RUNNABLE_KEY)
      }

      this.postService
        .create(
          new PostRequest(
            data['title'] == null ? (data['title'] = '') : data['title'],
            data['content'] == null ? (data['content'] = '') : data['content'],
            this.user.id.toString(),
            tagsName,
            data['attachmentUrl'] == null ? (data['attachmentUrl'] = '') : data['attachmentUrl'],
            data['attachmentDescription'] == null
              ? (data['attachmentDescription'] = '')
              : data['attachmentDescription']
          )
        )
        .subscribe(
          then => {
            this.router.navigate(['/profile']).then()
          },
          error => {
            console.log(error['message'])
          }
        )
    }
  }
}
