export class CreateCommitRequest {
  commitName: string;

  constructor(commitName: string) {
    this.commitName = commitName;
  }
}
