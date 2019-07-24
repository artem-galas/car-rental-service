import { TestBed } from '@angular/core/testing';

import { MyRentalService } from './my-rental.service';

describe('MyRentalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyRentalService = TestBed.get(MyRentalService);
    expect(service).toBeTruthy();
  });
});
