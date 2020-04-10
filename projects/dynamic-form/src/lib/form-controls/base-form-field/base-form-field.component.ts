import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UtilityService } from '../../services/utility.service';
import { Appearance, LabelDisplayMode, ControlType } from '../../models/common.models';
import { ExtendedFieldOptions, FormConfig } from '../../models/config.models';

@Component({
  selector: 'eb-base-form-field',
  templateUrl: './base-form-field.component.html',
  styleUrls: ['./base-form-field.component.scss']
})
export class BaseFormFieldComponent implements OnInit, OnDestroy {

  @Input() config: ExtendedFieldOptions;
  @Input() formConfig: FormConfig;
  @Input() formGroup: FormGroup;

  disabled: boolean = false;
  visible: boolean = true;
  stateSubscription: Subscription;

  disabledCondition: (group: FormGroup) => boolean = null;
  visibleCondition: (group: FormGroup) => boolean = null;

  constructor(
    protected utility: UtilityService,
  ) { }

  /**
   * Returns the control appearance. Available to controls wrapped with MatFormField.
   */
  get appearance(): Appearance {

    let appearance: Appearance = Appearance.Standard;

    if(this.formConfig && this.formConfig.appearance) {
      appearance = this.formConfig.appearance;
    }

    if(this.config && this.config.appearance) {
      appearance = this.config.appearance;
    }    

    return appearance;

  }

  /**
   * Whether to use Floating or Detached label. 
   * Floating label options are ignored detached labels are used. 
   * Available to controls wrapped with MatFormField.
   */
  get useFloatingLabel(): boolean {

    let useFloat: boolean = true;

    if(this.formConfig && this.formConfig.labels && this.formConfig.labels === LabelDisplayMode.Detached) {
      useFloat = false;
    }

    if(this.config && this.config.labelMode) {
      if(this.config.labelMode === LabelDisplayMode.Detached) {
        useFloat = false;
      }
      else {
        useFloat = true;
      }
    }    

    return useFloat;

  }

  /**
   * Return the option for floating labels. Available to controls wrapped with MatFormField.
   */
  get floatLabel(): string {

    let floatLabel: LabelDisplayMode = LabelDisplayMode.FloatAuto;

    if(this.formConfig && this.formConfig.labels) {
      if(this.formConfig.labels === LabelDisplayMode.Detached) {
        floatLabel = LabelDisplayMode.FloatAuto;
      }
      else {
        floatLabel = this.formConfig.labels;
      }  
    }

    if(this.config && this.config.labelMode && this.config.labelMode !== LabelDisplayMode.Detached) {
      floatLabel = this.config.labelMode
    }

    return floatLabel;

  } 

  /**
   * The reactive form control.
   */
  get formControl(): FormControl {

    if(!this.formGroup) {
      return null;
    }
    return this.formGroup.get(this.config.name) as FormControl;

  }

  get hasError(): boolean {
    return (this.formControl && !this.formControl.valid && this.formControl.parent.touched);
  }

  get required(): boolean {
    return this.config && this.config.validation && this.config.validation.required;
  }

  /**
   * Inline styles. May be composed by multiple configuration properties.
   */
  get style(): any {

    let style: any = {};
    let width: string = null;

    if(this.formConfig && this.formConfig.inputWidth) {

      switch(this.config.type){
        case ControlType.TextInput:
        case ControlType.TextArea:      
          width = this.formConfig.inputWidth;
          break;
       }            

    }

    if(this.config && this.config.width){
     width = this.config.width; 
    }

    if(width) {
      style.width = width;
    }

    return style;

  }

  ngOnInit() {
  
    if(this.disabledCondition || this.visibleCondition) {
      this.onFormChanges();

      if(this.formGroup.parent) {
        this.stateSubscription = this.formGroup.parent.valueChanges.subscribe(value => this.onFormChanges());
      }
      else {
        this.stateSubscription = this.formGroup.valueChanges.subscribe(value => this.onFormChanges());
      }
      
    }    

  }

  ngOnDestroy() {
    if(this.stateSubscription) this.stateSubscription.unsubscribe();
  }  

  onFormChanges(): void {

    let disableState: boolean;
    let visibileState: boolean;

    // only execute disable condition if form is not completelly disabled.
    if(!this.formGroup.disabled && this.disabledCondition) {

      if(this.formGroup.parent) {
        disableState = this.disabledCondition(this.formGroup.parent as FormGroup);
      }
      else {
        disableState = this.disabledCondition(this.formGroup);
      }

      this.setDisabled(disableState);
    }

    if(this.visibleCondition) {
      
      if(this.formGroup.parent) {
        visibileState = this.visibleCondition(this.formGroup.parent as FormGroup);
      }
      else {
        visibileState = this.visibleCondition(this.formGroup);
      }

      this.setVisible(visibileState);
    }

  }   

  setDisabled(disabled: boolean): void {

    if(disabled) {
      this.formControl.patchValue(null, { onlySelf: true, emitEvent: false });
      this.formControl.disable({ onlySelf: true, emitEvent: false });      
      this.disabled = true;
    }
    else {
      this.formControl.enable({ onlySelf: true, emitEvent: false });      
      this.disabled = false;
    }

    this.formControl.updateValueAndValidity({ emitEvent: false });

  } 
 
  setVisible(isVisible: boolean): void {

    let disableState = false;

    if(!isVisible) {
      disableState = true;
    }   
    else {
      if(this.disabledCondition) {

        if(this.formGroup.parent) {
          disableState = this.disabledCondition(this.formGroup.parent as FormGroup);
        }
        else {
          disableState = this.disabledCondition(this.formGroup);
        }        
      }
    } 

    this.setDisabled(disableState);
    this.visible = isVisible;
  }  

  errorMessage(): string {
    return this.utility.getError(this.formControl, this.config);
  }

}
