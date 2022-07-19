import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "../token/token-storage.service";
import {group_service} from "../../../environments/environment";
import {CreateGroupRequest} from "../../_dtos/group/CreateGroupRequest";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*' })
  };

  constructor(private http: HttpClient) {}


  create(createGroupRequest: CreateGroupRequest){
    return this.http.post(`${group_service.BASE_URL}`, createGroupRequest, this.httpOptions);
  }

  delete(group_id: number){
    return this.http.delete(`${group_service.BASE_URL}/${group_id}`, this.httpOptions);
  }

  addMembers(user_id: number){
    return this.http.patch(`${group_service.BASE_URL}/${user_id}/add-members`, this.httpOptions);
  }

  deleteMembers(user_id: number){
    return this.http.patch(`${group_service.BASE_URL}/${user_id}/delete-members`, this.httpOptions);
  }

  updateGroupName(group_id: number, name: string){
    return this.http.patch(`${group_service.BASE_URL}/${group_id}`, name, this.httpOptions);
  }

}