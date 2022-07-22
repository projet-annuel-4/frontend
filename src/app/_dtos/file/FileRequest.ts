export class FileRequest {
  id: number;
  direcoryId: number;
  type: string;
  title: string;
  link: string; // id du user
  description: string;


  constructor(id: number, direcoryId: number, type: string, title: string, link: string, description: string) {
    this.id = id;
    this.direcoryId = direcoryId;
    this.type = type;
    this.title = title;
    this.link = link;
    this.description = description;
  }
}
