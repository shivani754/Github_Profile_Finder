import { Injectable } from '@angular/core';
import {HttpClient,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {IUser} from './user';
import {catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class GithubuserserviceService {

  private _url:string="https://api.github.com/search/users?q=";
  constructor(private http:HttpClient) { }
  searchUser1(value:string){
    return this.http.get(this._url+value);
  }

  
}
