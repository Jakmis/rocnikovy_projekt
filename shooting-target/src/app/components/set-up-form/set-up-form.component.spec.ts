import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetUpFormComponent } from './set-up-form.component';

describe('SetUpFormComponent', () => {
  let component: SetUpFormComponent;
  let fixture: ComponentFixture<SetUpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetUpFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
