import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorganNavbarComponent } from './morgan-navbar.component';

describe('MorganNavbarComponent', () => {
  let component: MorganNavbarComponent;
  let fixture: ComponentFixture<MorganNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorganNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorganNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
