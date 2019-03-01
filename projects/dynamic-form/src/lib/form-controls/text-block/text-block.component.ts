import { Component, OnInit, Input } from '@angular/core';

import { UtilityService } from '../../services/utility.service';
import { TextBlockOptions } from '../../models/config.models';
import { BaseFormFieldComponent } from '../base-form-field/base-form-field.component';

@Component({
  selector: 'eb-text-block',
  templateUrl: './text-block.component.html',
  styleUrls: ['./text-block.component.scss']
})
export class TextBlockComponent extends BaseFormFieldComponent implements OnInit {

  @Input()
  config: TextBlockOptions;  

  constructor(
    protected utility: UtilityService,
  ) 
  { 
    super(utility);
  }

  ngOnInit() {
  }

}
