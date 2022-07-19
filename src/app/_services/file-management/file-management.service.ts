import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../token/token-storage.service";
import {Observable} from "rxjs";
import {file_service} from "../../../environments/environment";
import {DirectoryRequest} from "../../_dtos/directory/DirectoryRequest";
import {FileResponse} from "../../_dtos/file/FileResponse";
import {Directory} from "../../_dtos/directory/Directory";
import {FileRequest} from "../../_dtos/file/FileRequest";

@Injectable({
  providedIn: 'root'
})
export class FileManagementService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*' })
  };

  fileOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
  };

  constructor(private http: HttpClient) {}


  uploadFile(fileRequest: FileRequest, file: File){
    const data:FormData = new FormData();
    data.append("file", file);
    data.append("details", new Blob([JSON.stringify(fileRequest)]));

    return this.http.post(`${file_service.BASE_URL}`, data, this.fileOptions);
  }

  uploadDirectoryFiles(directoryRequest: DirectoryRequest, files: FileResponse[]): Observable<any>{
    const bodyRequest = {
      directoryRequest,
      files
    };
    return this.http.post(`${file_service.BASE_URL}/${directoryRequest.id}`, bodyRequest, this.fileOptions);
  }

  deleteFile(file_id: number){
    return this.http.delete(`${file_service.BASE_URL}/${file_id}`, this.fileOptions);
  }

  downloadFile(file_id: number, type: string): Observable<FileResponse>{
    return this.http.get<FileResponse>(`${file_service.BASE_URL}/${file_id}/?type=${type}`, this.fileOptions);
  }

  downloadDirectoryFiles(directory_id: number, type: string): Observable<Directory>{
    return this.http.get<Directory>(`${file_service.BASE_URL}/directory/${directory_id}/?type=${type}`, this.fileOptions);
  }
}