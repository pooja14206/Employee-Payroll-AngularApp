import { Data } from "@angular/router";

export class Employee {

    employeeId!: number;
    name!: string;
    gender!: string; 
    salary!: number;
    startDate!: Date;
    note!: string;
    profilePic!: string;
    department!: string[];
}