import { Component, OnInit, Input } from '@angular/core';

import { UtilityService } from '../../services';
import { SelectItem, RadioGroupOptions } from '../../models';
import { BaseFormFieldComponent } from '../base-form-field/base-form-field.component';

@Component({
  selector: 'eb-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss']
})
export class RadioGroupComponent extends BaseFormFieldComponent implements OnInit {

  @Input()
  config: RadioGroupOptions;   

  constructor(
    protected utility: UtilityService,
  ) 
  { 
    super(utility);
  }

  get items(): SelectItem[] {

    if(!this.config || !this.config.items) {
      return [];
    }

    return this.config.items;

  }

  ngOnInit() {
    super.ngOnInit();
  }

}
