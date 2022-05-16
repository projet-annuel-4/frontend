import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../token/token-storage.service";
import {Observable} from "rxjs";
import {ApiResponse} from "../../_dtos/common/ApiResponse";


export class Code_executionService{
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {

  }

  //TODO : use and create CodeExecutionDTO
  /*
  sendCode(language:string, code: string): Observable<ApiResponse>{
    return this.http.post(``,  , this.httpOptions) as Observable<ApiResponse>;
  }

   */


}
