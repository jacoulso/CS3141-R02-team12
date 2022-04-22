import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFriendsModalComponent } from './manage-friends-modal.component';

describe('ManageFriendsModalComponent', () => {
  let component: ManageFriendsModalComponent;
  let fixture: ComponentFixture<ManageFriendsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFriendsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFriendsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
