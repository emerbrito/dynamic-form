import { Directive, Input, ComponentFactoryResolver, ViewContainerRef, OnInit, OnDestroy, ComponentRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { DatePickerComponent } from '../form-controls/date-picker/date-picker.component';
import { DropdownComponent } from '../form-controls/dropdown/dropdown.component';
import { MultiSelectComponent } from '../form-controls/multi-select/multi-select.component';
import { NumericInputComponent } from '../form-controls/numeric-input/numeric-input.component';
import { RadioGroupComponent } from '../form-controls/radio-group/radio-group.component';
import { TextAreaComponent } from '../form-controls/text-area/text-area.component';
import { TextBlockComponent } from '../form-controls/text-block/text-block.component';
import { TextInputComponent } from '../form-controls/text-input/text-input.component';
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
  input: TextInputComponent,
  tooglebutton: ToggleInputComponent
};

@Directive({
  selector: '[ebDynamicComponent]'
})
export class DynamicComponentDirective implements OnInit, OnDestroy {

  @Input() controlConfig : ControlOptions;
  @Input() formConfig: FormConfig;    
  @Input() group: FormGroup;  
  component: ComponentRef<any>;
  _group: FormGroup;    

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef    
  ) { }

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
     * group.get('age').value > 45
     * And return a function:
     * function(group) { return [inline_expression] }
     */

    var body = "return " + this.expTokenReplacement(expression);
    return new Function('group', body);
  }
  
  expTokenReplacement(expression: string): string {

    /**
     * An expression should contain control names enclosed by brackes such as:
     * ${code} && ${code}.length > 3
     * These 'tokens' must be replaced into actual script the will pull the control from the form group as such:
     * group.get('code').value && group.get('code').value.length > 3 
     */


    let js: string = null;

    if(expression == null) {
      return "true";
    }

    js = expression.replace(/\${/g, "group.get('");
    js = js.replace(/(group.get\('[\w-]*?)(})/g, "$1').value");

    return js;

  }  

}
