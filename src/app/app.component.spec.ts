import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { first } from 'rxjs';
import { DebugElement } from '@angular/core';

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
    component.outputEvent
      .pipe(
        first(),
      )
      .subscribe({
        next: (value) => {
          expect(value).toEqual("The value was emitted by an @Output() decorator");
        },
      });
  });

  it(`should render text message in the DOM`, () => {
    component.renderTextMessage = true;
    fixture.detectChanges();

    const componentDebugElement: DebugElement = fixture.debugElement;
    const element: HTMLElement = componentDebugElement.nativeElement;
    const paragraph = element.querySelector('p');

    expect(paragraph?.textContent).toEqual('Testing my angular application');
  });

  it(`shouldn't render text message in the DOM`, () => {
    const componentDebugElement: DebugElement = fixture.debugElement;
    const element: HTMLElement = componentDebugElement.nativeElement;
    const paragraph = element.querySelector('p');

    expect(paragraph).toBeNull();
  });

  it(`should have isDone property as false`, () => {
    component.handleCheckIsDone();
    expect(component.isDone).toBeFalsy();
  });

  it (`should have isDone property as true`, fakeAsync(() => {
    component.handleCheckIsDone();

    tick(1000); // wait for 1 second to make sure that task is

    expect(component.isDone).toBeTruthy();
  }));
});
