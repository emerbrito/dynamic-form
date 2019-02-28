import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleInputComponent } from './toggle-input.component';

xdescribe('ToggleInputComponent', () => {
  let component: ToggleInputComponent;
  let fixture: ComponentFixture<ToggleInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
