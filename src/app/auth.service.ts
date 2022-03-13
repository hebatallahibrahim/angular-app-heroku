import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable,BehaviorSubject } from 'rxjs'
import{UserData}from 'userData'
// import {AdminData}from 'adminData'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(public _HttpClient:HttpClient) {
   }
   UserData= new BehaviorSubject(null);
   signup(data: any):Observable<any>
   {
    return this._HttpClient.post('https://route-egypt-api.herokuapp.com/signup',data);//wating api
   }

   signin(data: any):Observable<any>
   {
    return this._HttpClient.post('https://route-egypt-api.herokuapp.com/signin',data);// waiting api
    
   }
   saveUserData(citizen: any , token: any)
   {
    let users :any=new UserData(
      citizen.Name , citizen.Email ,
      citizen.Password , citizen.Phone , 
      citizen.Address , citizen.City,
      citizen.Region , token );
      this.UserData.next(users);
   }

   //admin auth
  //  AdminData= new BehaviorSubject(null);
  //  adminSignIn(data: any):Observable<any>
  //  {
  //   return this._HttpClient.post('',data);// waiting api
    
  //  }
}
