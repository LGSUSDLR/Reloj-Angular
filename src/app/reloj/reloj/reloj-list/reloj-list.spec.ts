import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojList } from './reloj-list';

describe('RelojList', () => {
  let component: RelojList;
  let fixture: ComponentFixture<RelojList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelojList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
