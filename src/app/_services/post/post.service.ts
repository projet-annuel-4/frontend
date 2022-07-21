import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {TokenStorageService} from "../token/token-storage.service";
import {Injectable} from "@angular/core";
import {Post} from "../../_dtos/post/Post";
import {Observable} from "rxjs";
import {post_service} from "../../../environments/environment";
import {User} from "../../_dtos/user/User";
import {CommentRequest} from "../../_dtos/post/CommentRequest";
import {PostFilterRequest} from "../../_dtos/post/PostFilterRequest";
import {PostRequest} from "../../_dtos/post/PostRequest";


@Injectable({
  providedIn: 'root'
})
export class PostService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*' })
  };

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}


  create(post: PostRequest): Observable<Post> {
    return this.http.post<Post>(`${post_service.BASE_URL}`, post, this.httpOptions);
  }

  getById(post_id: number): Observable<Post> {
    return this.http.get<Post>(`${post_service.BASE_URL}/${post_id}`, this.httpOptions);
  }

  update(post: Post): Observable<Post> {
    return this.http.put<Post>(`${post_service.BASE_URL}/${post.id}`, post, this.httpOptions);
  }

  getAllByUser(user_id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${post_service.BASE_URL}/userId/${user_id}`, this.httpOptions);
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${post_service.BASE_URL}`, this.httpOptions);
  }

  getAllByTagName(tagName: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${post_service.BASE_URL}/tagName/${tagName}`, this.httpOptions);
  }

  getAllByTagNameList(tagNameList: string[]): Observable<Post[]> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json','Access-Control-Allow-Origin':'*' });

    const requestParams = new HttpParams();
    tagNameList.forEach(tagName => {
      requestParams.set("", tagName);
    });

    const requestOptions = {
      header : this.httpOptions,
      params : requestParams
    };

    return this.http.get<Post[]>(`${post_service.BASE_URL}/tagsName`, requestOptions);
  }


  like(post_id: number, user_id: number): Observable<any>{
    return this.http.post(`${post_service.BASE_URL}/${post_id}/like/userId/${user_id}`, this.httpOptions);
  }

  dislike(post_id: number, user_id: number): Observable<any>{
    return this.http.post(`${post_service.BASE_URL}/${post_id}/dislike/userId/${user_id}`, this.httpOptions);
  }


  getUsersLiked(post_id: number): Observable<User[]> {
    return this.http.get<User[]>(`${post_service.BASE_URL}/${post_id}/userLiked`, this.httpOptions);
  }

  getPostLikedByUser(user_id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${post_service.BASE_URL}/userId/${user_id}/postLiked`, this.httpOptions);
  }

  delete(post_id: number): Observable<User[]> {
    return this.http.delete<User[]>(`${post_service.BASE_URL}/${post_id}`, this.httpOptions);
  }

  comment(comment: CommentRequest): Observable<any>{
    return this.http.post(`${post_service.BASE_URL}/answer`, comment, this.httpOptions);
  }

  getAllPostAnswers(postId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${post_service.BASE_URL}/${postId}/answers`, this.httpOptions);
  }

  getAllSubscriptionPost(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${post_service.BASE_URL}/subscriptions/userId/${userId}`, this.httpOptions);
  }

  getAllWithFilters(filters: PostFilterRequest): Observable<Post[]> {
    return this.http.post<Post[]>(`${post_service.BASE_URL}/filters`, filters, this.httpOptions);
  }

  getAllUserAnswers(user_id: number): Observable<Post[]>{
    return this.http.get<Post[]>(`${post_service.BASE_URL}/user/${user_id}/answers`, this.httpOptions);
  }

  getUserById(user_id: number): Observable<User>{
    return this.http.get<User>(`${post_service.BASE_URL}/user/${user_id}`, this.httpOptions);
  }

}
