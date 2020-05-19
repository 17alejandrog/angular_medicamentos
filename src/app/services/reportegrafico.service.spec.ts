import { TestBed } from '@angular/core/testing';

import { ReportegraficoService } from './reportegrafico.service';

describe('ReportegraficoService', () => {
  let service: ReportegraficoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportegraficoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
