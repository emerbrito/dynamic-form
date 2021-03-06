import { Component, OnInit, Input } from '@angular/core';

import { UtilityService } from '../../services/utility.service';
import { ContentAlignment } from '../../models/common.models';
import { NumericInputOptions } from '../../models/config.models';
import { BaseFormFieldComponent } from '../base-form-field/base-form-field.component';

@Component({
  selector: 'eb-numeric-input',
  templateUrl: './numeric-input.component.html',
  styleUrls: ['./numeric-input.component.scss']
})
export class NumericInputComponent extends BaseFormFieldComponent implements OnInit {

  @Input()
  config: NumericInputOptions;  

  constructor(
    protected utility: UtilityService,
  ) 
  { 
    super(utility);
  }

  get maxlength(): string {
    let ml: string = null;
    if(this.config.validation && this.config.validation.maxLength) {
      ml = this.config.validation.maxLength.toString();
    }
    return ml;
  }  

  get rightAligned(): boolean {

    if(this.config.align && this.config.align === ContentAlignment.Right) {
      return true;
    }

    return false;
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
