import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFormFieldComponent } from './base-form-field.component';

xdescribe('BaseFormFieldComponent', () => {
  let component: BaseFormFieldComponent;
  let fixture: ComponentFixture<BaseFormFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseFormFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
