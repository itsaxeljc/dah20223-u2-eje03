/* eslint-disable max-len */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from '../models/student';
import { StudentService } from '../services/student.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.page.html',
  styleUrls: ['./edit-student.page.scss'],
})
export class EditStudentPage implements OnInit {

  public student: Student;
  public id: string;
  public myForm: FormGroup;
  public validationMessages: object;

  constructor(private studentService: StudentService, private fb: FormBuilder, private router: Router, private alertController: AlertController, private activatedRoute: ActivatedRoute) {
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
    this.activatedRoute.queryParams.subscribe((params) => {
      this.id = params.id;
      this.studentService.getStudentById(params.id).subscribe(item => {
        this.student = item as Student;
      })
    });
    this.myForm = this.fb.group({
      controlnumber:[this.student.controlnumber, Validators.compose([Validators.minLength(8), Validators.required, Validators.pattern('^[0-9]+$')])],
      name:[this.student.name, Validators.required],
      curp:[this.student.curp, Validators.compose([Validators.required, Validators.pattern('^[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[HM]{1}(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]{1}[0-9]{1}$')])],
      age:[this.student.age, Validators.compose([Validators.required, Validators.min(17)])],
      nip:[this.student.nip, Validators.compose([Validators.required, Validators.min(10)])],
      email:[this.student.email, Validators.compose([Validators.required, Validators.email])],
      career:[this.student.career, Validators.required],
      photo:[this.student.photo, Validators.compose([Validators.required])]
    });

    this.validationMessages = {
      'controlnumber': [
        { type: 'required', message: "Debe capturar el número de control"},
        { type: 'minlength', message: "El número de control parece estar mal formado"},
        { type: 'pattern', message: "El número de control debe contener sólo números"}
      ],
      'name': [
        { type: 'required', message: "Debe capturar el nombre"}
      ],
      'curp': [
        { type: 'required', message: "Debe capturar la CURP"},
        { type: 'pattern', message: "La CURP parece estar mal formada"}
      ],
      'age': [
        { type: 'required', message: "Debe capturar la edad"},
        { type: 'min', message: "La edad es incorrecta"}
      ],
      'nip': [
        { type: 'required', message: "Debe capturar el NIP"},
        { type: 'min', message: "El NIP debe ser mayor a 9"}
      ],
      'email': [
        { type: 'required', message: "Debe capturar el email"},
        { type: 'email', message: "El email parece estar mal formado"}
      ],
      'career': [
        { type: 'required', message: "Debe capturar la carrera"}
      ],
      'photo': [
        { type: 'required', message: "Debe capturar la url de la fotografía"}
      ]
    }
  }

  public updateStudent() {
    this.student = {
      controlnumber: this.myForm.controls.controlnumber.value,
      name: this.myForm.controls.name.value,
      curp: this.myForm.controls.curp.value,
      age: this.myForm.controls.age.value,
      nip: this.myForm.controls.nip.value,
      email: this.myForm.controls.email.value,
      career: this.myForm.controls.career.value,
      photo: this.myForm.controls.photo.value,
    }
    if(this.myForm.valid){
      this.studentService.updateStudent(this.student,this.id);
      this.back();
    } else {
      this.alert();
    }
  }

  async alert() {
    const alert = await this.alertController.create({
      header: 'Verifique sus datos',
      subHeader: 'Error de captura',
      message: 'Verifique que todos los campos sean correctos',
      buttons: ['OK'],
    });
    await alert.present();
  }

  back(): void{
    this.router.navigate(['..']);
  }

}
