import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { first } from 'rxjs';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'rxjs-jest' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('rxjs-jest');
  });

  it(`should set the projectName property with 'RxJS and Jest App'`, () => {
    const projectName = "RxJS and Jest App";

    component.projectName = projectName;
    fixture.detectChanges();

    expect(component.projectName).toEqual(projectName);
  });

  it(`should emit event with @Output() decorator correctly`, () => {
    component.projectName = "Testing the @Output() decorator";

    component.outputEvent
      .pipe(
        first(),
      )
      .subscribe({
        next: (value) => {
          expect(value).toEqual("The value was emitted by an @Output() decorator");
        }
      });
  });
});
