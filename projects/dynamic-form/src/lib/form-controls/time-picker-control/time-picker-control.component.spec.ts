import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePickerControlComponent } from './time-picker-control.component';

describe('TimePickerControlComponent', () => {
  let component: TimePickerControlComponent;
  let fixture: ComponentFixture<TimePickerControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePickerControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePickerControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
