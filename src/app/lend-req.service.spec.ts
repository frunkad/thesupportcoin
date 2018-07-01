import { TestBed, inject } from '@angular/core/testing';

import { LendReqService } from './lend-req.service';

describe('LendReqService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LendReqService]
    });
  });

  it('should be created', inject([LendReqService], (service: LendReqService) => {
    expect(service).toBeTruthy();
  }));
});
