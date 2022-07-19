import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../_services/auth/auth.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  loading: Boolean = false

  constructor() { }

  ngOnInit(): void {
  }

}
