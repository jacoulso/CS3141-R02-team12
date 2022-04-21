import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcalModalComponent } from './newcal-modal.component';

describe('NewcalModalComponent', () => {
  let component: NewcalModalComponent;
  let fixture: ComponentFixture<NewcalModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcalModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcalModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
