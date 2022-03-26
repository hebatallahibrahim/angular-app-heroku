import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserData } from 'userData';
import {AdminData} from './DataOfAdmin'
// import {AdminData}from 'adminData'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public _HttpClient: HttpClient) {}
  UserData = new BehaviorSubject(null);
  signup(data: any): Observable<any> {
    return this._HttpClient.post(
      'http://127.0.0.1:8000/api/admin/create',
      data
    ); //wating api
  }
 
  signin(data: any): Observable<any> {
    return this._HttpClient.post(
      'https://route-egypt-api.herokuapp.com/signin',
      data
    ); // waiting api
  }
  saveUserData(citizen: any, token: any) {
    let users: any = new UserData(
      citizen.Name,
      citizen.Email,
      citizen.Password,
      citizen.Phone,
      citizen.Address,
      citizen.City,
      citizen.Region,
      token
    );
    this.UserData.next(users);
  }
///////////////////////////////admin//////////////////////////

adminSignUp(data: any): Observable<any> {
  return this._HttpClient.post(
    ' http://127.0.0.1:8000/api/signup',
    data
  );
}
adminLogIn(data: any): Observable<any> {
  return this._HttpClient.post('http://127.0.0.1:8000/api/login',data);
}
adminData=new BehaviorSubject(null);
saveAdminObjectData(user: any, access_token: any) 
{
  let Admin: any = new AdminData(
    user.Name,
    user.Email,
    user.Phone,
    user.Address,
    user.City,
    user.Region,
    access_token
  )
  this.adminData.next(Admin);
}
}
