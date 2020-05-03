import { TestBed } from '@angular/core/testing';

import { PersonResolverServiceService } from './person-resolver-service.service';

describe('PersonResolverServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonResolverServiceService = TestBed.get(PersonResolverServiceService);
    expect(service).toBeTruthy();
  });
});
