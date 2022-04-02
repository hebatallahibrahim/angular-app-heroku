import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup ,NgForm,Validators} from '@angular/forms';
import { AuthService } from '../../auth.service';

import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Service/authentication.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  constructor( private router:Router, private auth:AuthenticationService) { }

  ngOnInit(): void {
  }
  onSubmit(form:NgForm){
    const email = form.value.email;
    const password = form.value.password;

    // console.log(email, password);
    this.auth.login(email, password).subscribe((res:any)=>{
      // console.log(res);
      localStorage.setItem('user', JSON.stringify(res))

      // redirect to dashboard
      this.router.navigate(['/admin']);
    },
    err=>{
      console.log(err);
    })

  }
  
  }


