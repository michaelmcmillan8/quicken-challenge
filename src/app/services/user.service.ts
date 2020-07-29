import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://demo5838836.mockable.io/contact';

  constructor(private http: HttpClient) { }

  getUserData(): Observable<any> {
    return this.http.get(this.url);
  }
}
