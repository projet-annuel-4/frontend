export class UpdateProjectRequest {
  name: string;
  visibility: boolean;

  constructor(name: string, visibility: boolean) {
    this.name = name;
    this.visibility = visibility;
  }
}
