import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../token/token-storage.service";
import {Observable} from "rxjs";
import {ApiResponse} from "../../_dtos/common/ApiResponse";
import {Injectable} from "@angular/core";
import {CodeExecution} from "../../_dtos/code_execution/CodeExecution";
import {code_execution_service} from "../../../environments/environment";
import {Code} from "../../_dtos/code_execution/Code";
import {v4 as uuidv4} from 'uuid';
import {CodeExecutionResponse} from "../../_dtos/code_execution/CodeExecutionResponse";

@Injectable({providedIn: 'root'})
export class CodeService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  sendCode(code:CodeExecution): Observable<CodeExecutionResponse>{
    console.log(code.id);
    console.log(code.code);
    console.log(code.language);
    console.log(code.mode);
    console.log(code.test);
    //code.id = "2";
    return this.http.post<CodeExecutionResponse>(`${code_execution_service.SEND}`, code , this.httpOptions);
  }


  findCodeInContent(regexp: RegExp, str: string): string[]{
    let matches;
    let codesFound = [];

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
  cleanCode(code: string, language: string): string{
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
  cleanLanguage(language: string): string{
    return language
      .replace('`', '')
      .replace('`', '')
      .trim();
  }


  createCodeFromString(codeString: string): Code{
    const codeRegex = RegExp('`(.+?)`','g');
    let languageMatch = codeRegex.exec(codeString);

    return new Code(
      uuidv4(),
      this.cleanLanguage(languageMatch[0]),
      this.cleanCode(codeString, languageMatch[0]),
      "",
      false
    );
  }


  codePreview(inputContent: string){
    let codes: Code[] = [];

    //const regexp = RegExp('#(.+?)#(.+?)#(.+?)#','g');
    const regexp = RegExp('#(.+?)##','g');

    let codesFound = this.findCodeInContent(regexp, inputContent);

    codesFound.forEach(code => {
      codes.push(this.createCodeFromString(code));
    });

    return {codes, codesFound};
  }

}
