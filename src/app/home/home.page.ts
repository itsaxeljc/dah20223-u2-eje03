import { Component } from '@angular/core';

import { Student } from "../models/student";
import { StudentService } from "../services/student.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public students: Student[];

  constructor(private studentService: StudentService, private alertController: AlertController) {
    this.students = this.studentService.getStudents();
  }

  public async removeStudent(pos: number) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: ()=> {
            
          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: ()=> {
            this.students = this.studentService.removeStudent(pos);
          }
        }
      ]
    });

    await alert.present();

  }

}
