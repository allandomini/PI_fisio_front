import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisedetailsComponent } from './exercisedetails.component';

describe('ExercisedetailsComponent', () => {
  let component: ExercisedetailsComponent;
  let fixture: ComponentFixture<ExercisedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisedetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExercisedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
