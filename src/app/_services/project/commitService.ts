import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { File } from '../../_dtos/project/File'
import { project_file_service, project_service } from '../../../environments/environment'
import { Commit } from '../../_dtos/project/Commit'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TokenStorageService } from '../token/token-storage.service'
import { CreateCommitRequest } from '../../_dtos/project/CreateCommitRequest'

@Injectable({
  providedIn: 'root',
})
export class CommitService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  }

  httpOptionsFile = {
    responseType: 'arraybuffer' as 'json',
  }

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  create(branchId: number, request: CreateCommitRequest): Observable<Commit> {
    return this.http.post<Commit>(
      `${project_file_service.BASE_URL}/branch/${branchId}/commit`,
      request,
      this.httpOptions
    )
  }

  getAllCommit(branchId: number): Observable<Commit[]> {
    console.log(`${project_service.BASE_URL}/branch/${branchId}/commit/getAll`)
    return this.http.get<Commit[]>(
      `${project_file_service.BASE_URL}/branch/${branchId}/commit/getAllCommit`,
      this.httpOptions
    )
  }

  revert(branchId: number, commitId: number): Observable<any> {
    return this.http.post<any>(
      `${project_file_service.BASE_URL}/branch/${branchId}/commit/${commitId}/revert`,
      this.httpOptions
    )
  }
}
