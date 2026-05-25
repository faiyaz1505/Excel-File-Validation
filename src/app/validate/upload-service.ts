import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserResponse {
  age: number;
  country: string;
  date: string;
  errorMsg: string | null;
  firstName: string;
  gender: string;
  isError: boolean;
  lastName: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<UserResponse[]> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UserResponse[]>(`${this.baseUrl}`, formData);
  }

    validateUsers(userList: UserResponse[], businessContext: String): Observable<UserResponse[]> {
        return this.http.post<UserResponse[]>(
            `${this.baseUrl}/validate?businessContext=${businessContext}`,
            userList
        );
    }


}
