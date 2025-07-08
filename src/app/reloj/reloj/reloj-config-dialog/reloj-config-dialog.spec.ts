import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelojConfigDialog } from './reloj-config-dialog';

describe('RelojConfigDialog', () => {
  let component: RelojConfigDialog;
  let fixture: ComponentFixture<RelojConfigDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelojConfigDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelojConfigDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
