import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLoginComponent } from './main-login.component';

describe('MainLoginComponent', () => {
  let component: MainLoginComponent;
  let fixture: ComponentFixture<MainLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
