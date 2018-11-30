import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorganLoginComponent } from './morgan-login.component';

describe('MorganLoginComponent', () => {
  let component: MorganLoginComponent;
  let fixture: ComponentFixture<MorganLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorganLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorganLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
