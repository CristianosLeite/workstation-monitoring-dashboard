import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkstationsComponent } from './create-workstations.component';

describe('CreateWorkstationsComponent', () => {
  let component: CreateWorkstationsComponent;
  let fixture: ComponentFixture<CreateWorkstationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWorkstationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateWorkstationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
