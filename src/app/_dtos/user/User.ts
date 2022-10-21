export class User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  nbFollowers: number;
  nbSubscriptions: number;
  imgUrl: string;


  constructor(id: number, firstname: string, lastname: string, email: string, nbFollowers: number, nbSubscriptions: number, imgUrl: string) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.nbFollowers = nbFollowers;
    this.nbSubscriptions = nbSubscriptions;
    this.imgUrl = imgUrl;
  }
}
