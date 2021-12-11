import { Component, OnInit, Input } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material';

import { UtilityService } from '../../services/utility.service';
import { DatePickerViewMode } from '../../models/common.models';
import { DatePickerOptions } from '../../models/config.models';
import { BaseFormFieldComponent } from '../base-form-field/base-form-field.component';

@Component({
  selector: 'eb-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent extends BaseFormFieldComponent implements OnInit {

  @Input()
  config: DatePickerOptions;

  constructor(protected utility: UtilityService)
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
    console.log('Date picker initialized');
    super.ngOnInit();
  }

  dateFilter = (dateValue: Date | null): boolean => {

    console.log('dateFilter()', dateValue);
    console.log('config', this.config);
    if(!this.config || !this.config.preventToday) {
      return true;
    }

    const value = dateValue ? new Date(dateValue) : new Date();
    const today = new Date();

    value.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    return value.getTime() !== today.getTime();
  }

}
