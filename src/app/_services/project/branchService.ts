import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { project_service } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenStorageService } from '../token/token-storage.service';
import {Branch} from '../../_dtos/project/Branch';

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

  getAllBranch(projectId: number): Observable<string[]> {
    return this.http.get<string[]>(
      `${project_service.BASE_URL}/project/${projectId}/branch/getAllBranches`,
      this.httpOptions
    );
  }
}
