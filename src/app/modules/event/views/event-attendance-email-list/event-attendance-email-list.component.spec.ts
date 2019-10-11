import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAttendanceEmailListComponent } from './event-attendance-email-list.component';

describe('EventAttendanceEmailListComponent', () => {
  let component: EventAttendanceEmailListComponent;
  let fixture: ComponentFixture<EventAttendanceEmailListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventAttendanceEmailListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventAttendanceEmailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
