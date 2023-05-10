import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Iuser } from "../models/iuser";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private httpOptions = {};
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDM2MmJlNDYzZjA3ZjE3OTYzNmJmZTYiLCJ1c2VyUm9sZSI6ImFkbWluIiwiaWF0IjoxNjgxMzgyMDcyfQ.VRR-r6WGrCS_wTRgN4hmbhw7jYvxGCApDLFrW3GnU0c",
      }),
    };
  }

  getAllUsers(): Observable<Iuser[]> {
    return this.httpClient.get<Iuser[]>(
      `http://localhost:8000/users`,
      this.httpOptions
    );
  }

  addNewUser(user: Iuser): Observable<Iuser> {
    console.log(user);
    return this.httpClient.post<Iuser>(
      `http://localhost:8000/users`,
      JSON.stringify(user),
      this.httpOptions
    );
  }
  deleteUseer(userId: any): Observable<Iuser> {
    console.log(userId);
    return this.httpClient.delete<Iuser>(
      `http://localhost:8000/users/${userId}`,
      this.httpOptions
    );
  }

  filterByRole(role: string): Observable<Iuser> {
    return this.httpClient.get<Iuser>(
      `http://localhost:8000/users?role=${role}`,
      this.httpOptions
    );
  }
}
