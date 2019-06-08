import { Component, OnInit, Input } from '@angular/core';

import { UtilityService } from '../../services/utility.service';
import { ContentAlignment } from '../../models/common.models';
import { TimePickerOptions } from '../../models/config.models';
import { BaseFormFieldComponent } from '../base-form-field/base-form-field.component';

@Component({
  selector: 'eb-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent extends BaseFormFieldComponent implements OnInit {

  @Input()
  config: TimePickerOptions;

  constructor(
    protected utility: UtilityService,
  ) 
  { 
    super(utility);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
