import { User } from '../user/User'
import { Project } from '../project/Project'

export class Group {
  id: number;
  creatorId: number;
  name: string;
  members: User[];
  project: Project[];

  constructor(id: number, name: string, members: User[]) {
    this.id = id;
    this.name = name;
    this.members = members;
  }
}
