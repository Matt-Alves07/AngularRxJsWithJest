// #region Angular's imports
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject, filter, from, map, of, switchMap, takeUntil, zip } from 'rxjs';
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
  private studentUserId = '2';
  private ages = of(20, 30, 40, 50, 60, 70);
  private peopleData = from([
    { name: 'John Doe', age: 18, profession: 'Software Engineer' },
    { name: 'Julie Doe', age: 18, profession: 'UX' },
    { name: 'George Doe', age: 18, profession: 'Scrum Master' },
    { name: 'Sebastian Doe', age: 50, profession: 'Software Engineer' },
    { name: 'Rachel Doe', age: 30, profession: 'Software Engineer' },
  ]);
  private readonly destroy$: Subject<void> = new Subject();
  private zipSchoolResponses$ = zip(
    this.getStudentsData(),
    this.getTeachersData(),
  );
  // #endregion

  // #region public properties
  public title = 'rxjs-jest';
  public isDone: boolean = false;
  public students: Array<SchoolData> = [];
  public teachers: Array<SchoolData> = [];
  public renderTextMessage: boolean = false;

  @Input() public projectName!: string;
  @Output() public outputEvent = new EventEmitter<string>;
  // #endregion

  constructor(private schoolService: SchoolService) {}

  ngOnInit(): void {
    /*this.getSchoolData();
    this.getMultipliedAges();
    this.getPeopleProfessions();
    this.getPeopleNameByProfession('Software Engineer');
    this.getPeopleNameByProfession('Scrum Master');
    this.getStudentByID(this.studentUserId);*/
  }

  public handleEmitEvent(): void {
    this.outputEvent.emit("The value was emitted by an @Output() decorator");
  }

  public handleCheckIsDone(): void {
    setTimeout(() => {
      this.isDone = true;
    }, 200);
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
        map((element) => { return element * 2; }),
        takeUntil(this.destroy$),
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
        map((element) => element.profession),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (response) => console.log(`Profession: ${response}`)
      });
  }

  public getPeopleNameByProfession(profession: string): void {
    this.peopleData
      .pipe(
        filter((person) => person.profession === profession),
        //Another way to print the professional name, but it removes every
        //other property existing in PeopleData
        //map((element) => element.name),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (response) => console.log(`Person found working as a ${profession} : ${response.name}`)
      });
  }

  public getStudentByID(id: string): void {
    this.getStudentsData()
      .pipe(
        switchMap((students) => this.findStudentByID(students, this.studentUserId)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: ((response) => {console.log(response)}),
      });
  }

  // #region Private methods
  private getStudentsData(): Observable<Array<SchoolData>> {
    return this.schoolService.getStudents();
  }

  private getTeachersData(): Observable<Array<SchoolData>> {
    return this.schoolService.getTeachers();
  }

  private findStudentByID(students: Array<SchoolData>, studentId: string) {
    return from([students.find((student) => student.id === studentId)]);
  }
  // #endregion
}
