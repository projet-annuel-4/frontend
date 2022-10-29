import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {project_file_service, project_service} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from '../token/token-storage.service';
import {Branch} from '../../_dtos/project/Branch';
import {CreateBranchRequest} from '../../_dtos/project/CreateBranchRequest';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
  }
  create(projectId: number, branch: CreateBranchRequest): Observable<Branch> {
    return this.http.post<Branch>(
      `${project_file_service.BASE_URL}/${projectId}/branch/createBranch`,
      branch
    );
  }
  getAllBranch(projectId: number): Observable<string[]> {
    return this.http.get<string[]>(
      `${project_service.BASE_URL}/project/${projectId}/branch/getAllBranches`,
      this.httpOptions
    );
  }

  getActualBranch(projectId: number): Observable<Branch> {
    return this.http.get<Branch>(
      `${project_service.BASE_URL}/project/${projectId}/branch/getActualBranch`,
      this.httpOptions
    );
  }

  checkout(projectId: number, branch: string): Observable<any> {
    const target = {targetBranch: branch};
    console.log(target)
    return this.http.post<any>(
      `${project_file_service.BASE_URL}/${projectId}/branch/checkout`,
      target
    );
  }

  merge(projectId: number, branch: string): Observable<any> {
    const target = {branchToMerge: branch};
    console.log(target)
    return this.http.post<any>(
      `${project_file_service.BASE_URL}/${projectId}/branch/merge`,
      target
    );
  }
}
