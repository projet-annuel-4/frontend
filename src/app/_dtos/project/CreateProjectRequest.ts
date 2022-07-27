export class CreateProjectRequest {
  name: string;
  visibility: boolean;
  groupId: number;


  constructor(name: string, visibility: boolean, groupId: number) {
    this.name = name;
    this.visibility = visibility;
    this.groupId = groupId;
  }
}
