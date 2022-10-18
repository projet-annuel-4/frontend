import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TokenStorageService } from '../token/token-storage.service'
import { Observable } from 'rxjs'
import { project_file_service } from '../../../environments/environment'
import { File } from '../../_dtos/project/File'
import { CreateFileRequest } from '../../_dtos/project/CreateFileRequest'

@Injectable({
  providedIn: 'root',
})
export class FileService {
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

  create(projectId: number, file: CreateFileRequest): Observable<File> {
    return this.http.post<File>(
      `${project_file_service.BASE_URL}/${projectId}/file/createFile`,
      file
    )
  }

  getById(branchId: number, fileId: number): Observable<File> {
    return this.http.get<File>(
      `${project_file_service.BASE_URL}/branch/${branchId}/file/${fileId}/get`,
      this.httpOptions
    )
  }

  getFileData(projectId: number, fileNameUrl: string): Observable<ArrayBuffer> {
    return this.http.get<any>(
      `${project_file_service.BASE_URL}/${projectId}/file/getFileData?fileNameUrl=${fileNameUrl}`,
      { responseType: 'arraybuffer' as 'json'},
    )
  }

  getAllFileFromProject(projectId: number): Observable<string[]> {
    return this.http.get<string[]>(
      `${project_file_service.BASE_URL}/${projectId}/file/getTree`,
      this.httpOptions
    )
  }

  saveFile(projectId: number, fileId: number, data: FormData): Observable<File> {
    return this.http.post<File>(
      `${project_file_service.BASE_URL}/branch/${projectId}/file/${fileId}/save`,
      data
    )
  }

  deleteFile(branchId: number, fileId: number): Observable<File> {
    return this.http.delete<File>(
      `${project_file_service.BASE_URL}/branch/${branchId}/file/${fileId}/get`
    )
  }
}
