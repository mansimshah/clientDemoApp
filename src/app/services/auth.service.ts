import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  domain = "http://localhost:3000";
  authToken;
  user;
  options;

  constructor(
    private http: Http
  ) { }

  createAuthenticationHeaders(){
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    });
  }

  loadToken(){
    const token = localStorage.getItem('token');
    this.authToken = token;
  }

  registerUser(user){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });    
    return this.http.post(this.domain + '/authentication/register', user, options)
    .map((data: any) => {      
        console.log(JSON.stringify(data))            
        return data.json();
        // window.location.href = '/home';
      },
      error => {                
        console.log(' Error while add new user ' + JSON.stringify(error)); 
      });
  }

  checkUsername(username){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });    
    return this.http.get(this.domain + '/authentication/checkUsername/' + username)
    .map((data: any) => {      
        console.log("===check uname====="+JSON.stringify(data))            
        return data.json();
      },
      error => {                
        console.log(' Error while' + JSON.stringify(error)); 
      });
  }

  checkEmail(email){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });    
    return this.http.get(this.domain + '/authentication/checkEmail/' + email)
    .map((data: any) => {
        console.log("=====check email====="+JSON.stringify(data))     
        return data.json();
      },
      error => {
        console.log(' Error while ' + JSON.stringify(error));
      });
  }

  login(user){
    return this.http.post(this.domain + '/authentication/login', user).map((data: any) => {
      console.log("=====login user====="+JSON.stringify(data))     
      return data.json();
    },
    error => {
      console.log(' Error while ' + JSON.stringify(error));
    });
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user){
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile(){
     this.createAuthenticationHeaders();
     return this.http.get(this.domain + '/authentication/profile', this.options).map(res => res.json());
  }

  loggedIn(){
    return tokenNotExpired();
  }

}