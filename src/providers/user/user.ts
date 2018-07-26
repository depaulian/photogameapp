import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider {
  user:any;
  constructor(public http: HttpClient) {
    this.user = '';
  }

  setUser(user){
    this.user = user;
  }
  getUser(){
    return this.user;
  }

}
