import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
// import { group } from 'console';
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
    private fromBuilder: FormBuilder
  ) {
    this.employeeFormGroup = this.formBuilder.group({
      name: new FormControl(''),
      profilePic: new FormControl(''),
      gender: new FormControl(''),
      department: this.formBuilder.array([], [Validators.required]),
      salary: new FormControl(''),
      startDate: new FormControl(''),
      note: new FormControl('')
    })
  }
  ngOnInit(): void {

    if (this.activatedRouter.snapshot.params['id'] != undefined) {
      this.dataService.currentEmployee.subscribe(employee => {
        if (Object.keys(employee).length !== 0) {
          this.employeeFormGroup.get('name')?.setValue(employee.name);
          this.employeeFormGroup.patchValue({ 'profilePic': employee.profilePic });
          this.employeeFormGroup.patchValue({ 'gender': employee.gender });
          this.employeeFormGroup.get('salary')?.setValue(employee.salary);
          this.employeeFormGroup.get('startDate')?.setValue(employee.startDate);
          this.employeeFormGroup.get('note')?.setValue(employee.note);
          employee.department.forEach(departmentElement => {
            for (let index = 0; index < this.departments.length; index++) {
              if (this.departments[index].name === departmentElement) {
                this.departments[index].checked = true;
              }
            }
          })  
        }
      })
    }
  }          

  formatLabel(value: number) {
        if(value >= 1000) {
        return Math.round(value / 1000) + 'k';
      }
      return value;
    }

    onCheckboxChange(event: MatCheckboxChange) {
      const department: FormArray = this.employeeFormGroup.get('department') as FormArray;

      if (event.checked) {
        department.push(new FormControl(event.source.value));
      } else {
        const index = department.controls.findIndex(x => x.value === event.source.value);
        department.removeAt(index);
      }
    }

    salary: number = 400000;
    updateSetting(event: any) {
      this.salary = event.value;
    }

    onSubmit(): void {
      this.employee = this.employeeFormGroup.value;
      // if(this.employee == employee)
      this.httpService.addEmployeeData(this.employee).subscribe(response => {
        console.log(response);
        this.router.navigateByUrl("/home");
      });
    }
  }
