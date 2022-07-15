export class UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  imgUrl?: string;


  constructor(firstName: string, lastName: string, email: string, imgUrl: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.imgUrl = imgUrl;
  }
}
