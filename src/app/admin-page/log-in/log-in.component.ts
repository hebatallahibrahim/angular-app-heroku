import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,NgForm,Validators} from '@angular/forms';


import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Service/authentication.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  constructor( private router:Router, private auth:AuthenticationService) { }
  dangerAlertShow=false;
  SuccessAlertShow=false;
  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;

  
    this.auth.login(email, password).subscribe(
      (res:any)=>{
        console.log(res);
        if (res.message == 'Admin log in succesfully'){
      // console.log(res);
      localStorage.setItem('admin', JSON.stringify(res))
      this.SuccessAlertShow=true;
      this.dangerAlertShow=false;
      // redirect to dashboard
      this.router.navigate(['/admin']);
        }
    },
    err=>{
      this.SuccessAlertShow=false;
      this.dangerAlertShow=true;
      console.log(err);
     
    })

  }
  
  }


