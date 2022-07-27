export class Code {
  id: number;
  language: string;
  content: string;
  output: string;
  isRunnable: boolean;


  constructor(id: number, language: string, content: string, output: string, isRunnable: boolean) {
    this.id = id;
    this.language = language;
    this.content = content;
    this.output = output;
    this.isRunnable = isRunnable;
  }
}
