import { TestBed, inject } from '@angular/core/testing';

import { BorrowReqService } from './borrow-req.service';

describe('BorrowReqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BorrowReqService]
    });
  });

  it('should be created', inject([BorrowReqService], (service: BorrowReqService) => {
    expect(service).toBeTruthy();
  }));
});
