import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src/app/_services/auth/auth.service'
import { UserService } from 'src/app/_services/user/user.service'
import { delay } from 'rxjs/operators'
import { User } from '../../_dtos/user/User'

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss'],
})
export class TokenComponent implements OnInit {
  loading: Boolean = true
  profile: User
  token: string
  redirect = '/loading'

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.token = params['token']
      this.authService.setToken(this.token)
    })
  }

  ngOnInit(): void {
    ;(async () => {
      await delay(5000)
      this.userService.fetchProfile().subscribe(
        (profile: User) => {
          this.profile = profile
          this.loading = false
        },
        err => {
          this.router.navigateByUrl('/auth/signing')
        }
      )
    })()
  }

  continue() {
    this.router.navigateByUrl(this.redirect).then()
  }
}
