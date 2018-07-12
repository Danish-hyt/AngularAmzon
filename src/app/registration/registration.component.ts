import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { RestApiService } from '../rest-api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  cpassword = '';
  isSeller = false;

  btnDisabled = false;

  constructor(private router:Router, private data: DataService, private rest: RestApiService) { }

  ngOnInit() {
  }

  validate() {
    if (this.name) {
      if (this.email) {
        if (this.password) {
          if (this.cpassword) {
            if (this.password === this.cpassword) {
              return true;
            } else {
              this.data.error('Passwords do not match');
            }
          } else {
            this.data.error('Confirm password not entered');
          }
        } else {
          this.data.error('Passwords not entered');
        }
      } else {
        this.data.error('Email not entered');
      }
    } else {
      this.data.error('Name not entered');
    }
  }

  async register() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        const data = await this.rest.post('http://localhost:4400/api/accounts/signup',{
          name: this.name,
          email: this.email,
          password: this.password,
          isSeller: this.isSeller
        });
        if (data['success']) {
          localStorage.setItem('token',data['token']);
          this.data.success('Registration Successful!');
          this.router.navigate(['/login']);
        } else {
          this.data.error(data['message']);
        }
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

  
}
