import { Component, OnInit } from '@angular/core';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.page.html',
  styleUrls: ['./view-student.page.scss'],
})
export class ViewStudentPage implements OnInit {

  public student: Student;

  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute) {
    this.student = {
        controlnumber: "02400391",
        age: 38,
        career: "ISC",
        curp: "AOVI840917HNTRZS09",
        email: "iarjona@ittepic.edu.mx",
        name: "Israel Arjona Vizcaíno",
        nip: 717,
        photo: 'https://picsum.photos/600/?random=1',
        id: '123'
    }
  }

  ngOnInit() {
    // let cn;
    this.activatedRoute.queryParams.subscribe((params) => {
      this.studentService.getStudentById(params.id).subscribe(item => {
        this.student = item as Student;
      })
    });
    // console.log(cn);
  }

}
