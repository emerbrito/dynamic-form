import { Directive, Input, ComponentFactoryResolver, ViewContainerRef, OnInit, OnDestroy, ComponentRef } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

import { DatePickerComponent } from '../form-controls/date-picker/date-picker.component';
import { DropdownComponent } from '../form-controls/dropdown/dropdown.component';
import { MultiSelectComponent } from '../form-controls/multi-select/multi-select.component';
import { NumericInputComponent } from '../form-controls/numeric-input/numeric-input.component';
import { RadioGroupComponent } from '../form-controls/radio-group/radio-group.component';
import { TextAreaComponent } from '../form-controls/text-area/text-area.component';
import { TextBlockComponent } from '../form-controls/text-block/text-block.component';
import { TextInputComponent } from '../form-controls/text-input/text-input.component';
import { TimePickerComponent } from '../form-controls/time-picker/time-picker.component';
import { ToggleInputComponent } from '../form-controls/toggle-input/toggle-input.component';
import { ControlOptions, FormConfig } from '../models/config.models';

const components = {
  datepicker: DatePickerComponent,
  dropdown: DropdownComponent,
  multiselect: MultiSelectComponent,
  numeric: NumericInputComponent,
  radiogroup: RadioGroupComponent,        
  textarea: TextAreaComponent,
  textblock: TextBlockComponent,
  timepicker: TimePickerComponent,
  input: TextInputComponent,
  tooglebutton: ToggleInputComponent
};

@Directive({
  selector: '[ebDynamicComponent]'
})
export class DynamicComponentDirective implements OnInit, OnDestroy {

  @Input() controlConfig : ControlOptions;
  @Input() formConfig: FormConfig;
  @Input() controlPath: { [key: string]: string };
  @Input() group: FormGroup;  
  component: ComponentRef<any>;
  _group: FormGroup;    

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef    
  ) 
  { 
  }

  ngOnInit() {

    this._group = this.group;

    const component = components[this.controlConfig.type];
    const factory = this.resolver.resolveComponentFactory<any>(component);    
    this.component = this.container.createComponent(factory);
    this.component.instance.config = this.controlConfig;
    this.component.instance.formGroup = this.group;
    this.component.instance.formConfig = this.formConfig;
   
    if(this.controlConfig.expressions) {
      if(this.controlConfig.expressions.disabled) {
        this.component.instance.disabledCondition = this.parseExpression(this.controlConfig.expressions.disabled);
      }      
      if(this.controlConfig.expressions.visible) {
        this.component.instance.visibleCondition = this.parseExpression(this.controlConfig.expressions.visible);
      }            
    }

  }  

  ngOnDestroy() {

    if(this.controlConfig && this.controlConfig.name && this.group && this.group.get(this.controlConfig.name)) {
      let ctl = this.group.get(this.controlConfig.name);
      if(ctl) {
        ctl.setValue(null);
      }      
    }
    
  }

  parseExpression(expression: string): Function {    

    /**
     * Gets an expression such as:
     * controlValue('code').length > 3
     * and return a function. Note that the "controlValue" method is built into the function.
     * Function should look like this:
     * function(group) { return [inline_expression] }
     */

    var body = `
    let controlValue = function(name) {
      let value = null;
      let ctl = group.get(name);
      if(ctl) {        
        value = ctl.value;
      }
      return value;
    };
    return ${this.expTokenReplacement(expression)}`;

    //var body = "return " + this.expTokenReplacement(expression);
    return new Function('group', body);
  }
  
  expTokenReplacement(expression: string): string {

    /**
     * An expression should contain control names enclosed by brackes such as:
     * ${code} && ${code}.length > 3
     * These 'tokens' must be replaced with a function name that will pull the control value from the from group such as:
     * controlValue('code') && controlValue('code').length > 3 
     */

    if(expression == null) {
      return "true";
    }

    const tokenPattern = /\${.*?}/g;
    const fieldPattern = /\${(.*?)}/;
    const tokens = expression.match(tokenPattern);

    for(let i=0; i < tokens.length; i++) {
	
      const nameMatch = fieldPattern.exec(tokens[i]);

      if(nameMatch && nameMatch[1]) {

        const fieldName = nameMatch[1];
        const path = this.controlPath[fieldName];
        const token = new RegExp(this.escapeToken(tokens[i]), 'g');

        expression = expression.replace(token, `controlValue('${path}')`);
      }

    }    

    return expression;

  }  

  escapeToken(stringValue: string): string {
    return stringValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
  }  

}
