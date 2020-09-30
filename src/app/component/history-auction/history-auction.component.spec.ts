import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryAuctionComponent } from './history-auction.component';

describe('HistoryAuctionComponent', () => {
  let component: HistoryAuctionComponent;
  let fixture: ComponentFixture<HistoryAuctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryAuctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryAuctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
