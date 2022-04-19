import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEventModalComponent } from './new-event-modal.component';

describe('NewEventModalComponent', () => {
  let component: NewEventModalComponent;
  let fixture: ComponentFixture<NewEventModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewEventModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEventModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
