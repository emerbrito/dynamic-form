import { Component, OnInit, Input } from '@angular/core';

import { UtilityService } from '../../services/utility.service';
import { SelectItem, DropdownOptions } from '../../models/config.models';
import { BaseFormFieldComponent } from '../base-form-field/base-form-field.component';

@Component({
  selector: 'eb-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent extends BaseFormFieldComponent implements OnInit {

  @Input()
  config: DropdownOptions;  

  constructor(
    protected utility: UtilityService,
  ) 
  { 
    super(utility);
  }

  get items(): SelectItem[] {

    if(this.config && this.config.items) {
      return this.config.items;
    }
    return [];

  }

  ngOnInit() {
    super.ngOnInit();
  }

}
