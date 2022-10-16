import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { TokenStorageService } from '../token/token-storage.service'
import { Observable } from 'rxjs'
import { project_file_service } from '../../../environments/environment'
import { Files } from '../../_dtos/project/Filess'
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

  create(projectId: number, file: CreateFileRequest): Observable<Files> {
    return this.http.post<Files>(
      `${project_file_service.BASE_URL}/${projectId}/file/createFile`,
      file
    )
  }

  getById(branchId: number, fileId: number): Observable<Files> {
    return this.http.get<Files>(
      `${project_file_service.BASE_URL}/branch/${branchId}/file/${fileId}/get`,
      this.httpOptions
    )
  }

  getFileData(branchId: number, fileId: number): Observable<ArrayBuffer> {
    return this.http.get<any>(
      `${project_file_service.BASE_URL}/branch/${branchId}/file/${fileId}/getFileData?type=actual`,
      { responseType: 'arraybuffer' as 'json' }
    )
  }

  getAllFileFromProject(projectId: number): Observable<Files[]> {
    return this.http.get<Files[]>(
      `${project_file_service.BASE_URL}/${projectId}/file/getTree`,
      this.httpOptions
    )
  }

  saveFile(branchId: number, fileId: number, data: FormData): Observable<Files> {
    return this.http.post<Files>(
      `${project_file_service.BASE_URL}/branch/${branchId}/file/${fileId}/save`,
      data
    )
  }

  deleteFile(branchId: number, fileId: number): Observable<Files> {
    return this.http.delete<Files>(
      `${project_file_service.BASE_URL}/branch/${branchId}/file/${fileId}/get`
    )
  }
}
