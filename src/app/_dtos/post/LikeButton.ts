export class LikeButton {
  post_id: string;
  status: string;
  toggle: boolean


  constructor(post_id: string, status: string, toggle: boolean) {
    this.post_id = post_id;
    this.status = status;
    this.toggle = toggle;
  }
}
