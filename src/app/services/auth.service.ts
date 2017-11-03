import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  domain = "http://localhost:3000"

  constructor(
    private http: Http
  ) { }

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

}