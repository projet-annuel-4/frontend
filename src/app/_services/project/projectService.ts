import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../token/token-storage.service";
import {Observable} from "rxjs";
import {Commit} from "../../_dtos/project/Commit";
import {project_service} from "../../../environments/environment";
import {Project} from "../../_dtos/project/Project";
import {UpdateProjectRequest} from "../../_dtos/project/UpdateProjectRequest";
import {CreateProjectRequest} from "../../_dtos/project/CreateProjectRequest";
import {Branch} from "../../_dtos/project/Branch";

@Injectable({
  providedIn: 'root'
})

export class ProjectService{
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  createProject(request: CreateProjectRequest): Observable<Project> {
    return this.http.post<Project>(`${project_service.BASE_URL}/project/createProject`, request);
  }

  updateProject(projectId: number): Observable<any> {
    return this.http.get<any>(`${project_service.BASE_URL}/project/updateProject/${projectId}`, this.httpOptions);
  }

  getProjectById(projectId: number): Observable<Project> {
    return this.http.get<Project>(`${project_service.BASE_URL}/project/${projectId}/getProjects`, this.httpOptions);
  }

  getProjectByIdGroup(groupId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${project_service.BASE_URL}/project/${groupId}/getProjects`, this.httpOptions);
  }

  getActualBranchByProjectId(projectId: number): Observable<Branch> {
    return this.http.get<Branch>(`${project_service.BASE_URL}/project/${projectId}/branch/getActualBranch`, this.httpOptions);
  }

  deleteProject(projectId: number, request: UpdateProjectRequest): Observable<Project> {
    return this.http.post<Project>(`${project_service.BASE_URL}/project/deleteProject/${projectId}`, request, this.httpOptions);
  }
}
