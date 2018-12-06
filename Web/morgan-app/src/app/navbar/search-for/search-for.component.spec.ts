import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForComponent } from './search-for.component';

describe('SearchForComponent', () => {
  let component: SearchForComponent;
  let fixture: ComponentFixture<SearchForComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchForComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
