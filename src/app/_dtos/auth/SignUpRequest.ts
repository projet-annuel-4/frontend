export class SignUpRequest {
    firstname: string
    lastname: string
    email: string
    password: string
  password2: string
    captcha: string

    constructor(firstname: string, lastname: string, email: string,
                password: string, password2: string, captcha: string){
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.password = password;
      this.password2 = password2;
      this.captcha = captcha;
    }
}
