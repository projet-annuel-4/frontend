import {UserProfile} from "../user/UserProfile";
import {User} from "../user/User";

export class Post {
  id: string;
  content: string;
  nbLike: number;
  creationDate?: String;
  updateDate?: String;
  user: User;


  constructor(id: string, content: string, nbLike: number, creationDate: String, updateDate: String, user: User) {
    this.id = id;
    this.content = content;
    this.nbLike = nbLike;
    this.creationDate = creationDate;
    this.updateDate = updateDate;
    this.user = user;
  }
}
