import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  public employeeCount!: number;
  public employeeDetails: Employee[] = [];
  
  constructor(
    private httpService: HttpService,
    private router: Router,
    public dataService: DataService) { }
  
  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(data => {
      this.employeeDetails = data.data
      this.employeeCount = this.employeeDetails.length;
      // console.log(this.employeeDetails);
    });
  }

  /**
   * 
   * @method: remove method is use to delete the existing employee form database.
   * using the id of the person we delete the person from the addressbook.
   * @param empId 
   */
  remove(empId: number) {
    this.httpService.deleteEmployeeData(empId).subscribe(data => {
      // console.log(data);
      this.ngOnInit();
    });
  }
  /**
   * @method: update method is use to update the existing employee to database.
   * @param employee 
   */
  update(employee: Employee): void {
    this.dataService.changeEmployee(employee);
    this.router.navigateByUrl('/add/' +employee.employeeId);
  }
}