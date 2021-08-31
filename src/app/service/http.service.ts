import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseURL: string = "http://localhost:8080/employeepayrollservice/";

  constructor(  private httpClient: HttpClient){

  }

  getEmployeeData(): Observable<any> {
    return this.httpClient.get(this.baseURL + "get");
  }

  addEmployeeData(body: any): Observable<any> {
    return this.httpClient.post(this.baseURL + "create", body);
  }

  deleteEmployeeData(empId: number): Observable<any> {
    return this.httpClient.delete(this.baseURL + "delete/" + empId);
  }

  updateEmployeeData(empId: number, body: any): Observable<any> {
    return this.httpClient.put(this.baseURL + "update/"  + empId, body);
  }
}