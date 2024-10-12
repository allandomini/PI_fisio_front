import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExercisecrudComponent } from './exercisecrud.component';

describe('ExercisecrudComponent', () => {
  let component: ExercisecrudComponent;
  let fixture: ComponentFixture<ExercisecrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExercisecrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExercisecrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
