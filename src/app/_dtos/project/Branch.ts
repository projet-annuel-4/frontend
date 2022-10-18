import { File } from './File'
import { Commit } from './Commit'

export class Branch {
  id: number
  name: string
  creationDte: Date
  files: File[]
  commit: Commit[]

  constructor(id: number, name: string, creationDte: Date) {
    this.id = id
    this.name = name
    this.creationDte = creationDte
  }
}
