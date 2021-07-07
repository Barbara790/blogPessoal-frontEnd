import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

uri:string = 'http://localhost:8080'

  constructor(private http: HttpClient) { }
  token = {
    headers: new HttpHeaders().set('Authorization',environment.token)
  }
  
  refreshToken(){
    this.token = { headers: new HttpHeaders().set('Authorization',environment.token)}
  }

  getAllPostagens():Observable<Postagem[]>{
    return this.http.get<Postagem[]>(`${this.uri}/postagens`,this.token)
  }

  getByIdPostagem(id:number):Observable<Postagem>{
    return this.http.get<Postagem>(`${this.uri}/postagens/${id}`,this.token)
  }
  postPostagem(postagem: Postagem) : Observable<Postagem>{
    return this.http.post<Postagem>(`${this.uri}/postagens`, postagem, this.token)
  }


putPostagem(postagem: Postagem): Observable<Postagem>{
  return this.http.put<Postagem>(`${this.uri}/postagens`, postagem, this.token)
}

deletePostagem(id: number){
  return this.http.delete(`${this.uri}/postagens/${id}`,this.token)
}

}