import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorganForgotPasswordComponent } from './morgan-forgot-password.component';

describe('MorganForgotPasswordComponent', () => {
  let component: MorganForgotPasswordComponent;
  let fixture: ComponentFixture<MorganForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorganForgotPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorganForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
