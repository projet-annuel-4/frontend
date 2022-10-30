import {User} from "../user/User";

export class GroupRequest {
  id: number;
  name: string;
  creatorId: number;
  members: number[];

  constructor(id: number, name: string, creatorId: number, members: number[]) {
    this.id = id;
    this.name = name;
    this.creatorId = creatorId;
    this.members = members;
  }
}
