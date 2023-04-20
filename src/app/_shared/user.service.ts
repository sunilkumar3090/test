import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@app/_state/users/users-store';

export interface userReponse {
    users: User[]
    total: number
    skip: number
    limit: number
  }

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<userReponse> {
    return this.http.get<userReponse>(this.usersUrl);
  }
  updateUsers(userId:string ,body:any): Observable<any> {
    return this.http.put<userReponse>(this.usersUrl+'/'+ userId, body);
  }
  
}