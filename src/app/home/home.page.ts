import { Component } from '@angular/core';

import { Student } from "../models/student";
import { StudentService } from "../services/student.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public students: Student[];

  constructor(private studentService: StudentService) {
    this.students = this.studentService.getStudents();
  }

}
