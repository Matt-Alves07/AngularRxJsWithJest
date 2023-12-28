// #region Angular's imports
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, from, map, of, takeUntil, zip } from 'rxjs';
// #endregion

// #region Project's imports
import { SchoolData } from './models/school-data.interface';
import { SchoolService } from './services/school.service';
// #endregion

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // #region private properties
  private ages = of(20, 30, 40, 50, 60, 70);
  private peopleData = from([
    { name: 'John Doe', age: 18, profession: 'Software Engineer' },
    { name: 'Julie Doe', age: 18, profession: 'UX' },
    { name: 'George Doe', age: 18, profession: 'Scrum Master' },
  ]);
  private readonly destroy$: Subject<void> = new Subject();
  private zipSchoolResponses$ = zip(
    this.getStudentsData(),
    this.getTeachersData(),
  );
  // #endregion

  // #region public properties
  public title = 'rxjs-jest';
  public students: Array<SchoolData> = [];
  public teachers: Array<SchoolData> = [];
  // #endregion

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {
    this.getSchoolData();
    this.getMultipliedAges();
    this.getPeopleProfessions();
  }

  public getSchoolData(): void {
    this.zipSchoolResponses$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => {
          console.log('Students', response[0]);
          console.log('Teachers', response[1]);
        },
        error: (err) => {
          console.error(err);
        }
      });
  }

  public getMultipliedAges(): void {
    this.ages
      .pipe(
        map((element) => {
          return element * 2;
        })
      )
      .subscribe({
        next: (value) => {
          console.log(`Age multiplied by 2 is ${value}`);
        }
      });
  }

  public getPeopleProfessions(): void {
    this.peopleData
      .pipe(
        map((element) => element.profession)
      )
      .subscribe({
        next: (response) => console.log(`Profession: ${response}`)
      });
  }

  // #region Private methods
  private getStudentsData(): Observable<Array<SchoolData>> {
    return this.schoolService.getStudents();
  }

  private getTeachersData(): Observable<Array<SchoolData>> {
    return this.schoolService.getTeachers();
  }
  // #endregion
}
