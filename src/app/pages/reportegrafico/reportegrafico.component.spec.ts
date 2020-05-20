import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportegraficoComponent } from './reportegrafico.component';

describe('ReportegraficoComponent', () => {
  let component: ReportegraficoComponent;
  let fixture: ComponentFixture<ReportegraficoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportegraficoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportegraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
