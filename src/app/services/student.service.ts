/* eslint-disable prefer-const */
/* eslint-disable arrow-body-style */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/quotes */
import { Injectable } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/quotes
import { Student } from "../models/student";
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[];

  constructor(private firestore: AngularFirestore) {
    this.students = [
      {
        // eslint-disable-next-line @typescript-eslint/quotes
        controlnumber: "02400391",
        age: 38,
        career: "ISC",
        curp: "AOVI840917HNTRZS09",
        email: "iarjona@ittepic.edu.mx",
        name: "Israel Arjona Vizcaíno",
        nip: 717,
        photo: 'https://picsum.photos/600/?random=1'
      }, 
      {
        controlnumber: "12400391",
        age: 28,
        career: "IM",
        curp: "AOCI840917HNTRZS09",
        email: "iarjona2@ittepic.edu.mx",
        name: "Israel Arjona Castañeda",
        nip: 818,
        photo: 'https://picsum.photos/600/?random=2'
      },
      {
        controlnumber: "22400391",
        age: 18,
        career: "IC",
        curp: "OOCI840917HNTRZS09",
        email: "iarjona3@ittepic.edu.mx",
        name: "Israel Arjona Méndez",
        nip: 919,
        photo: 'https://picsum.photos/600/?random=3'
      }
    ];
  }

  public getStudents() {
    return this.firestore.collection('students').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Student;
          const id = a.payload.doc.id;
          return { id, ...data }; //Destrucutor, desmembra el obj, en vez de poner data.id, data.name
        });
      })
    );
  }

  public removeStudent(id: string){
    //this.students.splice(pos, 1);
    //return this.students;
    this.firestore.collection('students').doc(id).delete();
  }

  public getStudentByControlNumber(controlnumber: string): Student {
    let item: Student = this.students.find((student)=> {
      return student.controlnumber===controlnumber;
    });
    return item;
  }

  public newStudent(student: Student) {
    //this.students.push(student);
    //return this.students;
    this.firestore.collection('students').add(student);
  }

  public getStudentById(id: string){
    let result = this.firestore.collection('students').doc(id).valueChanges();
    return result;
  }

  public updateStudent(student: Student, id: string){
    this.firestore.doc('students/'+id).update(student);
  }
}
