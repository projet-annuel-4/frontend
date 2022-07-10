export class Code {
  id: string;
  language: string;
  content: string;
  output: string;
  isRunnable: boolean;


  constructor(id: string, language: string, content: string, output: string, isRunnable: boolean) {
    this.id = id;
    this.language = language;
    this.content = content;
    this.output = output;
    this.isRunnable = isRunnable;
  }
}
