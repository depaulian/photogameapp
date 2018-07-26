import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthProvider } from '../providers/auth/auth';
 
@Injectable()
export class EmailValidator {
 
  debouncer: any;
 
  constructor(public authProvider: AuthProvider){
 
  }
 
  checkEmail(control: FormControl): any {
 
    clearTimeout(this.debouncer);
 
    return new Promise(resolve => {
 
      this.debouncer = setTimeout(() => {
 
        this.authProvider.validateEmail(control.value).subscribe((res) => {
          if(res['status_code']==1){
            resolve(null);
          }else{
            resolve({'emailInUse': true});
          }
        }, (err) => {
          resolve({'emailInUse': true});
        });
 
      }, 1000);     
 
    });
  }
 
}