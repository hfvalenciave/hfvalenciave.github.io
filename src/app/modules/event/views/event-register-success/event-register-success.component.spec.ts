import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegisterSuccessComponent } from './event-register-success.component';

describe('EventRegisterSuccessComponent', () => {
  let component: EventRegisterSuccessComponent;
  let fixture: ComponentFixture<EventRegisterSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventRegisterSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRegisterSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
