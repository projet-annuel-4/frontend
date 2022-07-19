export class UserProfile {
    id: string
    email: string
    name: string
    imgUrl: string


  constructor(id: string, email: string, name: string, imgUrl: string) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.imgUrl = imgUrl;
  }
}
