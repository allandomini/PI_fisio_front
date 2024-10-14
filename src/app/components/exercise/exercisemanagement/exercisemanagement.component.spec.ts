import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisemanagementComponent } from './exercisemanagement.component';

describe('ExercisemanagementComponent', () => {
  let component: ExercisemanagementComponent;
  let fixture: ComponentFixture<ExercisemanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisemanagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExercisemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
