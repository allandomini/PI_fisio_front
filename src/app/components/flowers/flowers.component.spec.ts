import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowersComponent } from './flowers.component';

describe('FlowersComponent', () => {
  let component: FlowersComponent;
  let fixture: ComponentFixture<FlowersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
