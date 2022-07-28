import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../token/token-storage.service";
import {Observable} from "rxjs";
import {Commit} from "../../_dtos/project/Commit";
import {project_service} from "../../../environments/environment";
import {Project} from "../../_dtos/project/Project";
import {UpdateProjectRequest} from "../../_dtos/project/UpdateProjectRequest";

@Injectable({
  providedIn: 'root'
})

export class ProjectService{
  // create project
  // delete project
  // update project
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*' })
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}


  createProject(): Observable<Project> {
    return this.http.post<Project>(`${project_service.BASE_URL}/project/createProject`, null, this.httpOptions);
  }

  updateProject(projectId: number): Observable<any> {
    return this.http.get<any>(`${project_service.BASE_URL}/project/updateProject/${projectId}`, this.httpOptions);
  }

  getProjectByIdGroup(groupId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${project_service.BASE_URL}/project/${groupId}/getProjects`, this.httpOptions);
  }

  getBranchIdByProjectId(projectId: number): Observable<number> {
    return this.http.get<number>(`${project_service.BASE_URL}/project/branch/${projectId}/getBranch`, this.httpOptions);
  }


  deleteProject(projectId: number, request: UpdateProjectRequest): Observable<Project> {
    return this.http.post<Project>(`${project_service.BASE_URL}/project/deleteProject/${projectId}`, request, this.httpOptions);
  }
}
