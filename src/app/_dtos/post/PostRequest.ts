export class PostRequest {

  title: string;
  content: string;
  userId: string;
  tagsName: string[];
  attachmentUrl: string;
  attachmentDescription: string;


  constructor(title: string, content: string, userId: string, tagsName: string[], attachmentUrl: string, attachmentDescription: string) {
    this.title = title;
    this.content = content;
    this.userId = userId;
    this.tagsName = tagsName;
    this.attachmentUrl = attachmentUrl;
    this.attachmentDescription = attachmentDescription;
  }
}
