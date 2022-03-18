import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCalComponent } from './import-cal.component';

describe('ImportCalComponent', () => {
  let component: ImportCalComponent;
  let fixture: ComponentFixture<ImportCalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportCalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
