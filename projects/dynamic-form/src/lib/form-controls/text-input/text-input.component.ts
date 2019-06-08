import { Component, OnInit, Input } from '@angular/core';

import { UtilityService } from '../../services/utility.service';
import { ContentAlignment } from '../../models/common.models';
import { TextInputOptions } from '../../models/config.models';
import { BaseFormFieldComponent } from '../base-form-field/base-form-field.component';


@Component({
  selector: 'eb-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss']  
})
export class TextInputComponent extends BaseFormFieldComponent implements OnInit {

  @Input()
  config: TextInputOptions;

  constructor(
    protected utility: UtilityService,
  ) 
  { 
    super(utility);
  }

  get mask(): string {
    return this.config.mask;
  }

  get maxlength(): string {
    let ml: string = null;
    if(this.config.validation && this.config.validation.maxLength) {
      ml = this.config.validation.maxLength.toString();
    }    
    return ml;
  }  

  get rightAligned(): boolean {
    return this.config.align && this.config.align === ContentAlignment.Right;
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
