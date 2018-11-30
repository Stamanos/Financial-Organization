import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorganDetailsComponent } from './morgan-details.component';

describe('MorganDetailsComponent', () => {
  let component: MorganDetailsComponent;
  let fixture: ComponentFixture<MorganDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorganDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorganDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
