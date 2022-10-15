import { Branch } from './Branch'

export class Project {
  id: number
  name: string
  creationDate: Date
  visibility: boolean
  branch: Branch

  constructor(id: number, name: string, creationDate: Date, visibility: boolean, branch: Branch) {
    this.id = id
    this.name = name
    this.creationDate = creationDate
    this.visibility = visibility
    this.branch = branch
  }
}
