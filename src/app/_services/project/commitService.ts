import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {project_file_service} from '../../../environments/environment';
import {Commit} from '../../_dtos/project/Commit';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from '../token/token-storage.service';
import {CreateCommitRequest} from '../../_dtos/project/CreateCommitRequest';

@Injectable({
  providedIn: 'root',
})
export class CommitService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  httpOptionsFile = {
    responseType: 'arraybuffer' as 'json',
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  create(projectId: number, request: CreateCommitRequest): Observable<Commit> {
    console.log(projectId);
    return this.http.post<Commit>(
      `${project_file_service.BASE_URL}/${projectId}/commit/commit`,
      request,
      this.httpOptions
    );
  }

  getAllCommit(projectId: number): Observable<Commit[]> {
    return this.http.get<Commit[]>(
      `${project_file_service.BASE_URL}/${projectId}/commit/getAllCommits`,
      this.httpOptions
    );
  }

  revert(projectId: number, commitId: string): Observable<any> {
    const request = {commitToRevert: commitId};
    return this.http.post<any>(
      `${project_file_service.BASE_URL}/${projectId}/commit/revert`,
      request,
      this.httpOptions
    );
  }
}
