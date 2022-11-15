import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {CodeExecution} from '../../_dtos/code_execution/CodeExecution';
import {code_execution_service} from '../../../environments/environment';
import {Code} from '../../_dtos/code_execution/Code';
import {CodeExecutionResponse} from '../../_dtos/code_execution/CodeExecutionResponse';

@Injectable({providedIn: 'root'})
export class CodeService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  sendCode(code: CodeExecution): Observable<CodeExecutionResponse> {
    return this.http.post<CodeExecutionResponse>(`${code_execution_service.SEND}`, code, this.httpOptions);
  }


  findCodeInContent(regexp: RegExp, str: string): string[] {
    let matches;
    const codesFound = [];

    while ((matches = regexp.exec(str)) !== null) {
      codesFound.push(matches[0]);
    }
    return codesFound;
  }

  /**
   * # `ts` let a = 12; ##  =>  let a = 12;
   * @param code
   * @param language
   */
  cleanCode(code: string, language: string): string {
    if (code == null || language == null) {
      return;
    }
    return code
      .replace(language, '')
      .replace(/#/, '')
      .replace(/##/, '')
      .trim();
  }

  /**
   *  `js` => js
   * @param language
   */
  cleanLanguage(language: string): string {
    return language
      .replace('`', '')
      .replace('`', '')
      .trim();
  }


  createCodeFromString(codeString: string): Code {
    const codeRegex = RegExp('`(.+?)`', 'g');
    const languageMatch = codeRegex.exec(codeString);

    if (languageMatch == null) {
      return new Code(
        Math.floor(Math.random() * 1_000_000),
        '',
        this.cleanCode(codeString, ''),
        '',
        false
      );
    }


    return new Code(
      Math.floor(Math.random() * 1_000_000),
      this.cleanLanguage(languageMatch[0]),
      this.cleanCode(codeString, languageMatch[0]),
      '',
      false
    );
  }


  codePreview(inputContent: string) {
    const codes: Code[] = [];

    const regexp = RegExp('#(.+?)##', 'g');

    const codesFound = this.findCodeInContent(regexp, inputContent);

    codesFound.forEach(code => {
      codes.push(this.createCodeFromString(code));
    });

    return {codes, codesFound};
  }


  formatContent(content: string) {
    const newContent = content;
    const codes = this.codePreview(content);
    const obj = {
      text: '',
      code: ''
    };
    if (codes.codesFound.length > 0) {
      codes.codesFound.forEach((codeStr, i) => {
        obj.text += newContent.replace(codeStr, '') + '\n';
        obj.code += codes.codes[i].content.split('; ').join('; \n') + '\n';
      });
    } else {
      obj.text = newContent;
    }
    return obj;
  }


  codeValidation(content: string): boolean {
    const regexp = RegExp('#`(.+?)`(.+?)##', 'g');
    const languageMatch = regexp.exec(content);

    return languageMatch != null;
  }

}
