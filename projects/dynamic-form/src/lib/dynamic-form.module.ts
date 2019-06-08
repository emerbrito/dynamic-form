import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from './shared/material-components.module';

import { InputMaskModule } from '@emerbrito/input-mask';

import { DynamicComponentDirective  } from './directives/dynamic-component.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { BaseFormFieldComponent } from './form-controls/base-form-field/base-form-field.component';

import { TimePickerControlComponent } from './form-controls/time-picker-control/time-picker-control.component';

import { DatePickerComponent } from './form-controls/date-picker/date-picker.component';
import { DropdownComponent } from './form-controls/dropdown/dropdown.component';
import { MultiSelectComponent } from './form-controls/multi-select/multi-select.component';
import { NumericInputComponent } from './form-controls/numeric-input/numeric-input.component';
import { RadioGroupComponent } from './form-controls/radio-group/radio-group.component';
import { TextAreaComponent } from './form-controls/text-area/text-area.component';
import { TextBlockComponent } from './form-controls/text-block/text-block.component';
import { TextInputComponent } from './form-controls/text-input/text-input.component';
import { TimePickerComponent } from './form-controls/time-picker/time-picker.component';
import { ToggleInputComponent } from './form-controls/toggle-input/toggle-input.component';

import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';

@NgModule({
  declarations: [        
    DynamicComponentDirective,
    DynamicFormComponent,
    NumbersOnlyDirective,
    BaseFormFieldComponent,
    DatePickerComponent,
    DropdownComponent,
    MultiSelectComponent,
    NumericInputComponent,
    RadioGroupComponent,
    TextAreaComponent,
    TextBlockComponent,
    TextInputComponent,
    ToggleInputComponent,
    TimePickerComponent,
    TimePickerControlComponent    
  ],
  entryComponents: [
    DatePickerComponent,
    DropdownComponent,
    MultiSelectComponent,
    NumericInputComponent,
    RadioGroupComponent,
    TextAreaComponent,
    TextBlockComponent,
    TextInputComponent,
    TimePickerComponent,
    ToggleInputComponent    
  ],
  imports: [
    ReactiveFormsModule,
    MaterialComponentsModule,    
    InputMaskModule
  ],
  exports: [
    DynamicFormComponent    
  ]
})
export class DynamicFormModule { }
