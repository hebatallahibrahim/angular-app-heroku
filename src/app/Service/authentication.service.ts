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
       }
     else {
      const userObj = JSON.parse(localData);
    
      const token_expires_at = new Date(userObj.token_expires_at);
      const current_date = new Date();
 
 
        this.isLoggedIn.next(true);
  
    }
    return this.isLoggedIn.asObservable();
  }

  statuss() {
    const localData: any = localStorage.getItem('admin');
    if (!localData) {
      this.isLoggedIn.next(false);
       }
     else {
      const userObj = JSON.parse(localData);
    
      const token_expires_at = new Date(userObj.token_expires_at);
      const current_date = new Date();
 
 
        this.isLoggedIn.next(true);
  
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

    logoutt(): void {
   
      localStorage.removeItem('admin'); 
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

