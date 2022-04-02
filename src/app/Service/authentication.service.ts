import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  // Toogle Loggedin
  toggleLogin(state: boolean): void {
    this.isLoggedIn.next(state);
  }

  // Status
  status() {
    const localData: any = localStorage.getItem('user');
    if (!localData) {
      this.isLoggedIn.next(false);
       console.log('User not lgged in !!');
       }
     else {
      const userObj = JSON.parse(localData);
      console.log(userObj);
      const token_expires_at = new Date(userObj.token_expires_at);
      const current_date = new Date();
      console.log(token_expires_at);
      console.log(current_date);
    //   if (token_expires_at > current_date) {
        this.isLoggedIn.next(true);
    //   } else {
    //     this.isLoggedIn.next(false);
    //      console.log('Token Expires!!');
    //   }
    }
    return this.isLoggedIn.asObservable();
  }

  login(email: string, password: string) 
  {
    return this.http.post('http://127.0.0.1:8000/api/login', {
      email: email,
      password: password,
    });
  }

  adminSignUp(data: any): Observable<any> {
    return this.http.post(
      ' http://127.0.0.1:8000/api/signup',
      data
    );
  }


  logout(): void {
   
       localStorage.removeItem('user'); 
    }

 



  ///////////////////////////User//////////////////////////////////////

// signup 
  signup(data: any): Observable<any> {
  return this.http.post(
    'http://127.0.0.1:8000/api/user/signup',
    data
  ); 
}


  // Login
  loginUser(email: string, password: string) 
  {
    return this.http.post('http://127.0.0.1:8000/api/user/login', {
      email: email,
      password: password,
    });
  }


  // Forgot Pass
  forgot(email:string){
    return this.http.post('', {email:email});
  }


}

