import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseURL: string = "http://localhost:8080/employeepayrollservice/";

  constructor(
    private httpClient: HttpClient
    ) {}

  /*
    * @method: Get method for geting data from database and display to the hone page
    *return: List of employee present in employee_payroll_data table.
  */
  getEmployeeData(): Observable<any> {
    return this.httpClient.get(this.baseURL + "get");
  }

  /*
    * @method: Cretae method for creating a new record in database.
    * @param: body.
    *return: Newly created employee. 
  */
  addEmployeeData(body: Employee): Observable<any> {
    // console.log(body);
    return this.httpClient.post(this.baseURL + "create", body);
  }

  /*
    * @method: delete method for deleting a record from database.
    * @param: empId.
    *return: Updated employee list after delete. 
  */
  deleteEmployeeData(empId: number): Observable<any> {
    return this.httpClient.delete(this.baseURL + "delete/" + empId);
  }

  /*
    * @method: update method for update existing record to database.
    * @param: empId.
    * @param: body.
    *return: Updated employee. 
  */
  updateEmployeeData(empId: number, body: any): Observable<any> {
    return this.httpClient.put(this.baseURL + "update/" + empId, body);
  }
}