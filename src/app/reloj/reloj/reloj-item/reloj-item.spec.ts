import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojItem } from './reloj-item';

describe('RelojItem', () => {
  let component: RelojItem;
  let fixture: ComponentFixture<RelojItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelojItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
