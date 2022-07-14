import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../token/token-storage.service";
import {Observable} from "rxjs";
import {ApiResponse} from "../../_dtos/common/ApiResponse";
import {Injectable} from "@angular/core";
import {CodeExecution} from "../../_dtos/code_execution/CodeExecution";
import {code_execution_service} from "../../../environments/environment";
import {Code} from "../../_dtos/code_execution/Code";
import {v4 as uuidv4} from 'uuid';

@Injectable({providedIn: 'root'})
export class CodeService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  sendCode(code:CodeExecution): Observable<ApiResponse>{
    return this.http.post(`${code_execution_service.SEND}`, code , this.httpOptions) as Observable<ApiResponse>;
  }


  findCodeInContent(regexp: RegExp, str: string): string[]{
    let matches;
    let codesFound = [];

    while ((matches = regexp.exec(str)) !== null) {
      codesFound.push(matches[0]);
    }
    return codesFound;
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

  cleanLanguage(language: string): string{
    return language
                .replace('`', '')
                .replace('`', '')
                .trim();
  }



}
