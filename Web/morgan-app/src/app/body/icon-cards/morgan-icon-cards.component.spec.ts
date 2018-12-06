import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MorganIconCardsComponent } from './icon-cards.component';

describe('MorganIconCardsComponent', () => {
  let component: MorganIconCardsComponent;
  let fixture: ComponentFixture<MorganIconCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorganIconCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MorganIconCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
