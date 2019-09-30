import { TestBed } from '@angular/core/testing';

import { EventRegisterService } from './event-register.service';

describe('EventRegisterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventRegisterService = TestBed.get(EventRegisterService);
    expect(service).toBeTruthy();
  });
});
