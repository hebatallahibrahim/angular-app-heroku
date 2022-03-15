import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class profileUserService {

  constructor(private http: HttpClient) { }


  getthemoviedb() : any {
    return this.http.get<any>('http://127.0.0.1:8000/api/user/profile/{id}');
  }
  // getUserProfileByID(id: any) {
  //   this.http.get<any>(`http://127.0.0.1:8000/api/user/profile/${id}`);
  // }
}
