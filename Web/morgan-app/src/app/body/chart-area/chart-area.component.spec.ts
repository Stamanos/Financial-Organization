import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorganChartAreaComponent } from './chart-area.component';

describe('MorganChartAreaComponent', () => {
  let component: MorganChartAreaComponent;
  let fixture: ComponentFixture<MorganChartAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorganChartAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorganChartAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
