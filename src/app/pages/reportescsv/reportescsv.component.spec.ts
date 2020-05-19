import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportescsvComponent } from './reportescsv.component';

describe('ReportescsvComponent', () => {
  let component: ReportescsvComponent;
  let fixture: ComponentFixture<ReportescsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportescsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportescsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
