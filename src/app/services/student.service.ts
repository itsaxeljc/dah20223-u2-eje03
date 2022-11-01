import { Injectable } from '@angular/core';
import { Student } from "../models/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];

  constructor() {
    this.students = [
      {
        controlnumber: "02400391",
        age: 38,
        career: "ISC",
        curp: "AOVI840917HNTRZS09",
        email: "iarjona@ittepic.edu.mx",
        name: "Israel Arjona Vizcaíno",
        nip: 717
      }, 
      {
        controlnumber: "12400391",
        age: 28,
        career: "IM",
        curp: "AOCI840917HNTRZS09",
        email: "iarjona2@ittepic.edu.mx",
        name: "Israel Arjona Castañeda",
        nip: 818
      },
      {
        controlnumber: "22400391",
        age: 18,
        career: "IC",
        curp: "OOCI840917HNTRZS09",
        email: "iarjona3@ittepic.edu.mx",
        name: "Israel Arjona Méndez",
        nip: 919
      }
    ];
  }

  public getStudents(): Student[]{
    return this.students;
  }

  public removeStudent(pos: number): Student[]{
    this.students.splice(pos, 1);
    return this.students;
  }


}
