import { Component, OnInit } from '@angular/core';
import{FormControl ,FormGroup,Validators}from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegistration:FormGroup=new FormGroup({
    'Name': new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(8)]),
    'Email': new FormControl(null,[Validators.required,Validators.email]),
    'Password': new FormControl(null,[Validators.required,Validators.pattern('^[A-Z][a-z0-9]{3,8}$')]),
    'Phone': new FormControl(null,[Validators.required,Validators.pattern('^01[0125][0-9]{8}$')]),
    'Address': new FormControl(null,Validators.required),
    'City': new FormControl(null,Validators.required),
    'Region': new FormControl(null,Validators.required)
  })

  constructor() { }

  ngOnInit(): void {
  }
getFormData(FormData: any)
{
   console.log(FormData)
}
}
