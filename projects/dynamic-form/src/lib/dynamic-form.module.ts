import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialComponentsModule } from './shared/material-components.module';

import { DynamicComponentDirective  } from './directives/dynamic-component.directive';
import { NumbersOnlyDirective } from './directives/numbers-only.directive';
import { BaseFormFieldComponent } from './form-controls/base-form-field/base-form-field.component';

import { DatePickerComponent } from './form-controls/date-picker/date-picker.component';
import { DropdownComponent } from './form-controls/dropdown/dropdown.component';
import { NumericInputComponent } from './form-controls/numeric-input/numeric-input.component';
import { RadioGroupComponent } from './form-controls/radio-group/radio-group.component';
import { TextAreaComponent } from './form-controls/text-area/text-area.component';
import { TextBlockComponent } from './form-controls/text-block/text-block.component';
import { TextInputComponent } from './form-controls/text-input/text-input.component';
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
    NumericInputComponent,
    RadioGroupComponent,
    TextAreaComponent,
    TextBlockComponent,
    TextInputComponent,
    ToggleInputComponent    
  ],
  entryComponents: [
    DatePickerComponent,
    DropdownComponent,
    NumericInputComponent,
    RadioGroupComponent,
    TextAreaComponent,
    TextBlockComponent,
    TextInputComponent,
    ToggleInputComponent    
  ],
  imports: [
    ReactiveFormsModule,
    MaterialComponentsModule,    
  ],
  exports: [
    DynamicFormComponent
  ]
})
export class DynamicFormModule { }
