import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorganDataTableComponent } from './data-table.component';

describe('MorganDataTableComponent', () => {
  let component: MorganDataTableComponent;
  let fixture: ComponentFixture<MorganDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorganDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorganDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
