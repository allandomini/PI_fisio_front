import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormIntensidadeComponent } from './form-intensidade.component';

describe('FormIntensidadeComponent', () => {
  let component: FormIntensidadeComponent;
  let fixture: ComponentFixture<FormIntensidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormIntensidadeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormIntensidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
