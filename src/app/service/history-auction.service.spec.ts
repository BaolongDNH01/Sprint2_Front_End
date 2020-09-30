import { TestBed } from '@angular/core/testing';

import { HistoryAuctionService } from './history-auction.service';

describe('HistoryAuctionService', () => {
  let service: HistoryAuctionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryAuctionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
