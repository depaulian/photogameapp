import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, shareReplay, switchMap, takeUntil} from 'rxjs/operators';
import { Photo, PhotoResponse } from '../../models/photo/photo';
import { Subject } from 'rxjs/Subject';
import { timer } from 'rxjs/observable/timer';

const API_ENDPOINT = 'http://photogame.test/v1';
const CACHE_SIZE = 1;
const REFRESH_INTERVAL = 30000;

@Injectable()
export class AuthProvider {
  private reload$ = new Subject<void>();
  private cache$: Observable<Array<Photo>>;
  constructor(public http: HttpClient) {}

  validateUsername(username){

    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/json'})};
    return this.http.get(API_ENDPOINT + '/validate-username/' + username, headers).pipe(map(res => res));

  }

  validateEmail(email){

    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/json'})};
    return this.http.get(API_ENDPOINT + '/validate-email/' + email, headers).pipe(map(res => res));

  }

  signIn(data){

    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/json'})};
    let body = { username:data.username,password:data.password};
    return this.http.post(API_ENDPOINT + '/signin',JSON.stringify(body), headers).pipe(map(res => res));

  }
  signUp(data){

    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/json'})};
    let body = { username:data.username,email:data.email,password:data.password};
    return this.http.post(API_ENDPOINT + '/signup',JSON.stringify(body), headers).pipe(map(res => res));
    
  }

  postPhoto(data){
    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer ' + data.token})};
    let body = { 
                  caption:data.caption,
                  description:data.description,
                  category:data.category,
                  location:data.location,
                  owner:data.owner,
                  time_taken:data.timestamp,
                  photo:data.image,
                };
    return this.http.post(API_ENDPOINT + '/post-photo',JSON.stringify(body), headers).pipe(map(res => res));
    
  }

  postVote(data){
    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer ' + data.token})};
    let body = { user_id:data.user_id, vote:data.vote,photo_id:data.photo_id };
    return this.http.post(API_ENDPOINT + '/vote-photo',JSON.stringify(body), headers).pipe(map(res => res));
  }
  postView(data){
    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer ' + data.token})};
    let body = { user_id:data.user_id, photo_id:data.photo_id };
    return this.http.post(API_ENDPOINT + '/view-photo',JSON.stringify(body), headers).pipe(map(res => res));
  }

  photos(params) {
    if (!this.cache$) {
      const timer$ = timer(0, REFRESH_INTERVAL);

      this.cache$ = timer$.pipe(
        switchMap(() => this.requestPhotos(params)),
        takeUntil(this.reload$),
        shareReplay(CACHE_SIZE)
      );
    }

    return this.cache$;
  }

  forceReload(params) {
    this.cache$ = null;
    const timer$ = timer(0, REFRESH_INTERVAL);
    this.cache$ = timer$.pipe(
      switchMap(() => this.requestPhotos(params)),
      takeUntil(this.reload$),
      shareReplay(CACHE_SIZE)
    );
    return this.cache$;
  }

  clearCache() {
    this.cache$ = null;
  }

  private requestPhotos(params) {
    let headers =  {headers: new  HttpHeaders({ 'Content-Type': 'application/json','Authorization':'Bearer ' + params.token})};
    return this.http.get<PhotoResponse>(API_ENDPOINT+'/photos?limit='+params.limit+'&offset='+params.offset+'&sorting='+params.sorting+'', headers).pipe(
      map(response => response['result'])
    );
  }
}
