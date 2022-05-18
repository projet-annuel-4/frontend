export class SignUpRequest {
    firstname: string
    lastname: string
    email: string
    password: string
    cpassword: string

    constructor(firstname: string, lastname: string, email: string,
                password: string, cpassword: string){
      this.firstname = firstname;
      this.lastname = lastname;
      this.email = email;
      this.password = password;
      this.cpassword = cpassword;
    }
}
