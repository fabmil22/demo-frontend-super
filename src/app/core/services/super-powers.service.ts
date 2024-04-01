import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Power } from '../models/power.interface';

const url = 'http://localhost:3000/api/v1/powers';
@Injectable({
  providedIn: 'root'
})
export class SuperPowersService {

  constructor(private _http: HttpClient) { }

  getPowers(): Observable<any> {
    return this._http.get<any>(url);
  }
}
