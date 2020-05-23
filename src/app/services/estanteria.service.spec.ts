import { TestBed } from '@angular/core/testing';

import { EstanteriaService } from './estanteria.service';

describe('EstanteriaService', () => {
  let service: EstanteriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstanteriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
