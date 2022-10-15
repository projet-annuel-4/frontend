export class SignUpRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  password2: string
  captcha: string

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    password2: string,
    captcha: string
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
    this.password2 = password2
    this.captcha = captcha
  }
}
