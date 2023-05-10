import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserAndShowDetailsComponent } from './update-user-and-show-details.component';

describe('UpdateUserAndShowDetailsComponent', () => {
  let component: UpdateUserAndShowDetailsComponent;
  let fixture: ComponentFixture<UpdateUserAndShowDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserAndShowDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserAndShowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
