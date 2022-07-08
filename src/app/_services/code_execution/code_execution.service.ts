import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../token/token-storage.service";
import {Observable} from "rxjs";
import {ApiResponse} from "../../_dtos/common/ApiResponse";
import {Injectable} from "@angular/core";
import {CodeExecution} from "../../_dtos/code_execution/CodeExecution";
import {code_execution_service} from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class Code_executionService{
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}


  sendCode(code:CodeExecution): Observable<ApiResponse>{
    return this.http.post(`${code_execution_service.SEND}`, code , this.httpOptions) as Observable<ApiResponse>;
  }


}
