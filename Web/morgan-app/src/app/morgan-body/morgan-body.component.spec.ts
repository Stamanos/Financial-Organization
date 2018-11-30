import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorganBodyComponent } from './morgan-body.component';

describe('MorganBodyComponent', () => {
  let component: MorganBodyComponent;
  let fixture: ComponentFixture<MorganBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorganBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorganBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
