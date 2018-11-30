import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorganFiltersComponent } from './morgan-filters.component';

describe('MorganFiltersComponent', () => {
  let component: MorganFiltersComponent;
  let fixture: ComponentFixture<MorganFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorganFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorganFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
