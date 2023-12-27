// #region Angular's imports
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
// #endregion

// #region Project's imports
import { SchoolData } from '../models/school-data.interface';
// #endregion

@Injectable({
  providedIn: 'root'
})
export class SchoolService {
  // #private properties
  private students: Array<SchoolData> = [
    { id: '1', name: 'Marcos' },
    { id: '2', name: 'João'},
    { id: '3', name: 'Márcia'},
  ];

  private teachers: Array<SchoolData> = [
    { id: '1', name: 'Jorge'},
    { id: '2', name: 'Luiz'},
    { id: '3', name: 'Gabriel'},
  ]
  // #endregion

  constructor() { }

  public getStudents(): Observable<Array<SchoolData>> {
    return of(this.students);
  }

  public getTeachers(): Observable<Array<SchoolData>> {
    return of(this.teachers);
  }
}
