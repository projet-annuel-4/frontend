export class PostRequest {

  title: string;
  content: string;
  userId: string;
  tagName: String;
  attachmentUrl: string;
  attachmentDescription: string;


  constructor(title: string, content: string, userId: string, tagName: String, attachmentUrl: string, attachmentDescription: string) {
    this.title = title;
    this.content = content;
    this.userId = userId;
    this.tagName = tagName;
    this.attachmentUrl = attachmentUrl;
    this.attachmentDescription = attachmentDescription;
  }
}
