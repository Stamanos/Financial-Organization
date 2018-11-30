import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorganLogoutComponent } from './morgan-logout.component';

describe('MorganLogoutComponent', () => {
  let component: MorganLogoutComponent;
  let fixture: ComponentFixture<MorganLogoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorganLogoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorganLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
