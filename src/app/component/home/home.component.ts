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
  public employeeCount: number = 10;
  public employeeDetails: Employee[] = [];
  


  constructor(private httpService: HttpService, private router: Router,public dataService: DataService) { }
  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(data => {
      this.employeeDetails = data.data
      this.employeeCount = this.employeeDetails.length;
      console.log(this.employeeDetails);
    });
  }

  remove(empId: number) {
    this.httpService.deleteEmployeeData(empId).subscribe(data => {
      console.log(data);
      this.ngOnInit();
    });
  }

  // d: any = new Date('yourDate');
  // d.setMinutes( d.getMinutes() + d.getTimezoneOffset() );

  // update(employee: Employee):void{
  //   this.router.navigateByUrl("/add");
  //   this.httpService.updateEmployeeData(empId, employee).subscribe(response =>{
  //     console.log(response);
  //     // this.router.navigateByUrl("/home");
  // });
  // }
  update(employee: Employee): void {
    this.dataService.changeEmployee(employee);
    this.router.navigateByUrl('/add/' +employee.empId)
  }
}