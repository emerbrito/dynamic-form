import { Component, OnInit, Input } from '@angular/core';

import { UtilityService } from '../../services';
import { DatePickerViewMode, DatePickerOptions } from '../../models';
import { BaseFormFieldComponent } from '../base-form-field/base-form-field.component';

@Component({
  selector: 'eb-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent extends BaseFormFieldComponent implements OnInit {

  @Input()
  config: DatePickerOptions;   

  constructor(
    protected utility: UtilityService,
  ) 
  { 
    super(utility);
  }

  get maxDate(): Date {
    return this.config.maxDate;    
  }  

  get minDate(): Date {
    return this.config.minDate;
  }

  get startDate(): Date {
    return this.config.startDate;
  }

  get activeView(): DatePickerViewMode {
    return this.config.activeView || DatePickerViewMode.Month;
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
