import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../token/token-storage.service";
import {PostRequest} from "../../_dtos/post/PostRequest";
import {Observable} from "rxjs";
import {Post} from "../../_dtos/post/Post";
import {post_service, project_file_service} from "../../../environments/environment";
import {Filess} from "../../_dtos/project/Filess";
import { FileRequest } from 'src/app/_dtos/file/FileRequest';
import {CreateFileRequest} from "../../_dtos/project/CreateFileRequest";

@Injectable({
  providedIn: 'root'
})

export class FileService{

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*' })
  };

  httpOptionsFile = {
    responseType  : 'arraybuffer' as 'json'
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  create(branchId: number, file: CreateFileRequest): Observable<Filess> {
    return this.http.post<Filess>(`${project_file_service.BASE_URL}/branch/${branchId}/file/create`, file);
  }

  getById(branchId: number, fileId: number): Observable<Filess> {
    return this.http.get<Filess>(`${project_file_service.BASE_URL}/branch/${branchId}/file/${fileId}/get`, this.httpOptions);
  }

  getFileData(branchId: number, fileId: number): Observable<ArrayBuffer> {
    return this.http.get<any>(`${project_file_service.BASE_URL}/branch/${branchId}/file/${fileId}/getFileData?type=actual`,
      { responseType: 'arraybuffer' as 'json'});
  }

  getAllFileFromBranch(branchId: number): Observable<Filess[]> {
    return this.http.get<Filess[]>(`${project_file_service.BASE_URL}/branch/${branchId}/file/getAll`, this.httpOptions);
  }

  saveFile(branchId: number, fileId: number, data: FormData): Observable<Filess> {
    return this.http.post<Filess>(`${project_file_service.BASE_URL}/branch/${branchId}/file/${fileId}/save`, data);
  }

  deleteFile(branchId: number, fileId: number): Observable<Filess> {
    return this.http.delete<Filess>(`${project_file_service.BASE_URL}/branch/${branchId}/file/${fileId}/get`);
  }
  // get file
  // get allfile from project
  // save file
  // create file
}
