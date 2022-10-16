export class Files {
  id: number
  name: string
  type: boolean
  lastCommitName: string

  constructor(id: number, name: string, type: boolean, lastCommitName: string) {
    this.id = id
    this.name = name
    this.type = type
    this.lastCommitName = lastCommitName
  }
}
