export class Commit {
  code: string;
  name: string;
  date: Date;

  constructor(code: string, name: string, date: Date) {
    this.code = code;
    this.name = name;
    this.date = date;
  }
}
