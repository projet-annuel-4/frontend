export class PostRequest {

  content: string;
  userId: string;
  tagName: String;
  attachmentUrl: string;
  attachmentDescription: string;


  constructor(content: string, userId: string, tagName: String, attachmentUrl: string, attachmentDescription: string) {
    this.content = content;
    this.userId = userId;
    this.tagName = tagName;
    this.attachmentUrl = attachmentUrl;
    this.attachmentDescription = attachmentDescription;
  }
}
