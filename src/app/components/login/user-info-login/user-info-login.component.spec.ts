import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoLoginComponent } from './user-info-login.component';

describe('UserInfoLoginComponent', () => {
  let component: UserInfoLoginComponent;
  let fixture: ComponentFixture<UserInfoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserInfoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
