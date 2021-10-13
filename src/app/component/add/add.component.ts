import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {


  public employee: Employee = new Employee;
  public employeeFormGroup: FormGroup;

  departments: Array<any> = [
    {
      name: "HR",
      value: "HR",
      checked: false
    },
    {
      name: "Sales",
      value: "Sales",
      checked: false
    },
    {
      name: "Finance",
      value: "Finance",
      checked: false
    },
    {
      name: "Engineer",
      value: "Engineer",
      checked: false
    },
    {
      name: "Other",
      value: "Other",
      checked: false
    }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private dataService: DataService,
    private activatedRouter: ActivatedRoute,
  ) {
    /**
     * Added validations to the EMPLOYEE data.
     */
    this.employeeFormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.pattern("^[A-Z]{1}[a-zA-Z\\s]{2,}$")]),
      profilePic: new FormControl(''),
      gender: new FormControl('', Validators.required),
      department: this.formBuilder.array([], Validators.required),
      salary: new FormControl('', [Validators.required,  Validators.min(500)]),
      startDate: new FormControl('', Validators.required),
      note: new FormControl('', Validators.required)
    })
  }

  myDate = new Date();
  maxDate = new Date(
    this.myDate.getFullYear(),
    this.myDate.getMonth(),
    this.myDate.getDate()
  );

  /**
   * This method set employee object value of a particular employee id in the employeeFormBuilder.
   * It is called when we perform update() operation.
   */
  ngOnInit(): void {

    if (this.activatedRouter.snapshot.params['id'] != undefined) {
      this.dataService.currentEmployee.subscribe(employee => {
        if (Object.keys(employee).length !== 0) {
          this.employeeFormGroup.get('name')?.setValue(employee.name);
          this.employeeFormGroup.patchValue({ 'profilePic': employee.profilePic });
          this.employeeFormGroup.patchValue({ 'gender': employee.gender });
          this.employeeFormGroup.get('salary')?.setValue(employee.salary);
          this.employeeFormGroup.patchValue({ 'startDate': employee.startDate });
          this.employeeFormGroup.patchValue({ 'note': employee.note });
          const department: FormArray = this.employeeFormGroup.get('department') as FormArray;
          employee.department.forEach(departmentElement => {
            for (let index = 0; index < this.departments.length; index++) {
              if (this.departments[index].name === departmentElement) {
                this.departments[index].checked = true;
                department.push(new FormControl(this.departments[index].value))
              }
            }
          })
        }
      })
    }
  }

  /**
   * This method validate the employee details
   * @param controlName 
   * @param errorName 
   * @returns 
   */
  public checkError = (controlName: string, errorName: string) => {
    return this.employeeFormGroup.controls[controlName].hasError(errorName);
  }

  /**
   * this method capute the salary value 
   */
  salary: number | undefined;
  updateSetting(event: any) {
    this.salary = event.value;
  }

  /**
   * formatLabel() is set at an interval of 1000.
   * @param value 
   * @returns 
   */
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  /**
   * Department is a array.
   * This oncheckboxChange method is called to store the checked values.
   * when a checkbox is checked, the value is store to department.
   * @param event 
   */
  onCheckboxChange(event: MatCheckboxChange) {
    const department: FormArray = this.employeeFormGroup.get('department') as FormArray;

    if (event.checked) {
      department.push(new FormControl(event.source.value));
    } else {
      const index = department.controls.findIndex(x => x.value === event.source.value);
      department.removeAt(index);
    }
  }
  
  /**
   * onSubmit method is common for Add or Update a employee.
   * If employee is already present it will update the record or else add a new employee to the database.
   */
  onSubmit(): void {
    this.employee = this.employeeFormGroup.value;
    // console.log(this.employeeFormGroup.value);
    if (this.activatedRouter.snapshot.params['id'] != undefined) {
      this.httpService.updateEmployeeData(this.activatedRouter.snapshot.params['id'],
      this.employee).subscribe(Response => {
        this.router.navigateByUrl("/home");
        
      });
    } else {
      this.employee = this.employeeFormGroup.value;
      // console.log(this.employee);
      this.httpService.addEmployeeData(this.employee).subscribe(response => {
        this.router.navigateByUrl("/home");
      });
    }
  }
}