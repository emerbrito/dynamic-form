import { Component, OnInit, Input } from '@angular/core';

import { UtilityService } from '../../services/utility.service';
import { TextAreaOptions } from '../../models/config.models';
import { BaseFormFieldComponent } from '../base-form-field/base-form-field.component';

@Component({
  selector: 'eb-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent extends BaseFormFieldComponent implements OnInit {

  @Input()
  config: TextAreaOptions;    

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

  get rows(): number {

    let rowsTotal = 4;

    if(this.config.rows) {
      rowsTotal = this.config.rows;
    }

    return rowsTotal;

  }

  ngOnInit() {
    super.ngOnInit();
  }

}
