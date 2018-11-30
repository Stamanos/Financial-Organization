import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorganSidebarComponent } from './morgan-sidebar.component';

describe('MorganSidebarComponent', () => {
  let component: MorganSidebarComponent;
  let fixture: ComponentFixture<MorganSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorganSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorganSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
