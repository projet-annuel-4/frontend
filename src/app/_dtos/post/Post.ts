export class Post {
  id?: string;
  content: string;
  user_id: number;
  nbLike: number;
  creationDate: Date;
  updateDate: Date;


  constructor(id: string, content: string, user_id: number, nbLike: number, creationDate: Date, updateDate: Date) {
    this.id = id;
    this.content = content;
    this.user_id = user_id;
    this.nbLike = nbLike;
    this.creationDate = creationDate;
    this.updateDate = updateDate;
  }
}
