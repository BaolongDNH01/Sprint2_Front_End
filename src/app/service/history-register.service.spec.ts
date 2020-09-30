import { TestBed } from '@angular/core/testing';

import { HistoryRegisterService } from './history-register.service';

describe('HistoryRegisterService', () => {
  let service: HistoryRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
