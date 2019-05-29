import { Component, OnInit, Input } from '@angular/core';

import { UtilityService } from '../../services/utility.service';
import { SelectItem, MultiSelectOptions } from '../../models/config.models';
import { BaseFormFieldComponent } from '../base-form-field/base-form-field.component';
import { MatSelectionListChange } from '@angular/material';

@Component({
  selector: 'eb-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css']
})
export class MultiSelectComponent extends BaseFormFieldComponent implements OnInit {

  @Input()
  config: MultiSelectOptions;     

  get items(): SelectItem[] {

    if(!this.config || !this.config.items) {
      return [];
    }

    return this.config.items;
  }  

  constructor(protected utility: UtilityService) 
  { 
    super(utility);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  selected(dataItem: SelectItem): boolean {

    let flag: boolean = false;
    let formValues = this.formControl.value as any[];

    if(formValues && formValues.length > 0) {
      
      if(formValues.filter(e => e == dataItem.value).length > 0) {
        flag = true;
      }
    }

    return flag;
  }

  selectionChange(e: MatSelectionListChange) {
    
    let value: any[] = null;

    if(e.source.selectedOptions && e.source.selectedOptions.selected && e.source.selectedOptions.selected.length > 0) {

      value = [];
      e.source.selectedOptions.selected.forEach(option => {
        value.push(option.value);
      });

    }

    this.formControl.setValue(value);
  }
  
}
