import { Component, OnInit, Input } from '@angular/core';

import { UtilityService } from '../../services/utility.service';
import { ToggleMode } from '../../models/common.models';
import { ToggleOptions } from '../../models/config.models';
import { BaseFormFieldComponent } from '../base-form-field/base-form-field.component';

@Component({
  selector: 'eb-toggle-input',
  templateUrl: './toggle-input.component.html',
  styleUrls: ['./toggle-input.component.scss']
})
export class ToggleInputComponent extends BaseFormFieldComponent implements OnInit {

  @Input()
  config: ToggleOptions;   

  constructor(
    protected utility: UtilityService,
  ) 
  { 
    super(utility);
  }

  get checkBox(): boolean {

    if(!this.config || !this.config.toggleMode || this.config.toggleMode === ToggleMode.CheckBox) {
      return true;
    }

    return false;

  }

  ngOnInit() {
    super.ngOnInit();
  }

}
