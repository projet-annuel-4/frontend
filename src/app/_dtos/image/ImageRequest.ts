export class ImageRequest {
  type: string;
  title: string;
  link:string; //id du user
  description: string;


  constructor(type: string, title: string, link: string, description: string) {
    this.type = type;
    this.title = title;
    this.link = link;
    this.description = description;
  }
}
