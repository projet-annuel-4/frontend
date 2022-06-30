export class CommentRequest {
  postId: string;
  answerId: string;
  userId: string;


  constructor(postId: string, answerId: string, userId: string) {
    this.postId = postId;
    this.answerId = answerId;
    this.userId = userId;
  }
}
