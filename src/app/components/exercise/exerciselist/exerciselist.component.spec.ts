import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciselistComponent } from './exerciselist.component';

describe('ExerciselistComponent', () => {
  let component: ExerciselistComponent;
  let fixture: ComponentFixture<ExerciselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExerciselistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExerciselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
