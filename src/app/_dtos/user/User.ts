export class User {
  id:number;
  firstname: string;
  lastname:string;
  email:string;
  followers: number;
  imgUrl: string;


  constructor(id: number, firstname: string, lastname: string, email: string, followers: number, imgUrl: string) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.followers = followers;
    this.imgUrl = imgUrl;
  }
}
