import {User} from "../user/User";
import {Tag} from "./Tag";

export class Post {
  id: string;
  content: string;
  nbLike: number;
  creationDate?: String;
  updateDate?: String;
  tags: Tag[];
  user: User;


  constructor(id: string, content: string, nbLike: number, creationDate: String, updateDate: String, tags: Tag[], user: User) {
    this.id = id;
    this.content = content;
    this.nbLike = nbLike;
    this.creationDate = creationDate;
    this.updateDate = updateDate;
    this.tags = tags;
    this.user = user;
  }
}
