import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, ValidatorFn, Validators, AbstractControl } from '@angular/forms';
import { UtilityService } from './utility.service';
import { ErrorCodes, ValidationError } from '../models/error.models';
import { ControlType, Appearance, LabelDisplayMode, StepperLabelPosition, ContentAlignment, ButtonType, Color } from '../models/common.models';
import { FormConfig, ControlGroup, ControlOptions, FieldOptions, DynamicFormInternals, Model, DatePickerOptions } from '../models/config.models';
import { timeValidator } from '../models/time.validator';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  constructor(
    private fb: FormBuilder,
    private formUtility: UtilityService
  ) { }

  /**
   * Applies a flat model containing form values over existing form options.
   * @param options The form options object.
   * @param values The model.
   */
  applyValues(options: FormConfig, values: Model): FormConfig {

    if(!options) {
      throw new Error('Unable to apply values. Options is null or undefined.');      
    }

    options = this.formUtility.copy(options) as FormConfig;

    if(!values || !options.controlGroups || options.controlGroups.length === 0) {
      return options;
    }

    options.controlGroups.forEach(ctg => {      
      if(ctg.controls) {
        ctg.controls.forEach(ctl => {
          if(values[ctl.name]) {
            (ctl as FieldOptions).value = values[ctl.name];
          }
        });
      }
    });

    return options;

  }

  /**
   * Creates a reactive form and additional data required to render the dynamic form.
   * @param options The form settings.
   * @param values A model containing initial form values.
   */
  create(options: FormConfig, values?: Model): DynamicFormInternals {
    
    let form: FormGroup;    
    let data: DynamicFormInternals;
    let newOptions: FormConfig;

    this.validateFormOptions(options);
    newOptions = this.cloneWithDefaults(options);
    newOptions = this.applyValues(newOptions, values);

    if(newOptions.controlGroups.length > 1) {
      
      // handles multi group form      
      form = this.fb.group([]);
      newOptions.controlGroups.forEach((group, index) => {      
        form.addControl(group.name, this.createGroup(group));
      })

    }
    else  {

      // handles single group form
      form = this.createGroup(newOptions.controlGroups[0])

    }

    data = new DynamicFormInternals(form, newOptions)

    return data;

  }

  /**
   * Checks whether it is a safe name (starts with a letter, contain only alphanumeric characters,  "_" and "-").
   * @param name The name to be tested.
   */
  safeName(name: string): boolean {

    let pattern = /^[a-zA-Z][a-zA-Z0-9_]*$/;

    if(!name) {
      return false;
    }

    return pattern.test(name);

  }

  /**
   * Validates the form configuration. Throws an error if it fails.
   * @param options Item to validate.
   */
  validateFormOptions(options: FormConfig): void {

    let uniqueGroups: { [key: string]: string} = {};
    let uniqueControls: { [key: string]: string} = {};    
    
    if(!options) {
      throw new ValidationError('Form configuration cannot be null.', ErrorCodes.ConfigIsNull);
    }

    if(!options.controlGroups || options.controlGroups.length === 0) {
      throw new ValidationError('Form configuration must have at least one group.', ErrorCodes.GroupNullOrEmpty);
    }

    options.controlGroups.forEach(group => {

      this.validateGroupOptions(group);
      if(group.name) {
        if(!this.uniqueName(uniqueGroups, group.name)) {
          throw new ValidationError('Duplicated group name: ${group.name}.', ErrorCodes.DuplicateGroupName);
        }
      }
      
      group.controls.forEach(control => {
        this.validateControlOptions(control);
        if(!this.uniqueName(uniqueControls, control.name)) {
          throw new ValidationError('Duplicate control name: ${control.name}', ErrorCodes.DuplicateControlName);
        }
      });

    });

  }

  /**
   * Validates a control confituration. Throws an error if it fails.
   * @param options Item to validate.
   */
  validateControlOptions(options: ControlOptions): void {

    if(!options) {
      throw new ValidationError('Control configuration cannot be null.', ErrorCodes.ControlConfigIsNull);
    }

    if(!options.name) {
      throw new ValidationError('At least one control is missing a name.', ErrorCodes.ControlNameIsNull);
    }     
    
    if(!this.safeName(options.name)) {      
      throw new ValidationError(
        'Invalid control name: ${controlConfig.name}. Name should contain only alphanumeric charaters and underscore. It also should always start with a letter.', 
        ErrorCodes.InvalidName);
    } 
    
    if(!options.type) {
      throw new ValidationError('At least one control is missing the type property.', ErrorCodes.TypeNullOrEmpty);
    }     

  }  

  /**
   * Validatios a control group configuration. Throws an error if it fails.
   * @param group Item to validate.
   */
  validateGroupOptions(group: ControlGroup): void {

    if(!group) {
      throw new ValidationError('Group configuration cannot be null.', ErrorCodes.GroupConfigIsNull);
    }

    if(group.name) {
      if(!this.safeName(group.name)) {
        throw new ValidationError(
          'Invalid group name: ${groupConfig.name}. Name should be left null for auto naming or if specified contain only alphanumeric charaters and underscore. It also should always start with a letter.',
          ErrorCodes.InvalidName);
      }
    }

    if(!group.controls || group.controls.length === 0) {
      throw new ValidationError('At least one group was defined without any controls.', ErrorCodes.GroupHasNoControls);
    }    

  }

  private builtInValidators(options: FieldOptions): ValidatorFn[] {

    let validators: ValidatorFn[] = [];

    if(!options.validation){
      return validators;      
    }    

    if(options.validation.email) {
      validators.push(Validators.email);
    }      
    if(options.validation.max) {
      validators.push(Validators.max(options.validation.max));
    }
    if(options.validation.maxLength) {
      validators.push(Validators.maxLength(options.validation.maxLength));
    }
    if(options.validation.min) {
      validators.push(Validators.min(options.validation.min));
    }
    if(options.validation.minLength) {
      validators.push(Validators.minLength(options.validation.minLength));
    }
    if(options.validation.pattern) {
      validators.push(Validators.pattern(options.validation.pattern));
    }
    if(options.validation.required){
      validators.push(Validators.required);
    }
    if(options.validation.requiredTrue){
      validators.push(Validators.requiredTrue);
    }     
    
    return validators;

  }

  private cloneWithDefaults(options: FormConfig): FormConfig {

    let copy = this.formUtility.copy(options) as FormConfig;
    let i: number;
    let submit = {
      text: 'Submit',
      color: Color.Accent
    };

    copy.appearance = copy.appearance || Appearance.Standard;
    copy.inputWidth = copy.inputWidth || '100%';
    copy.labels = copy.labels || LabelDisplayMode.Detached;
    copy.stepperTitles = copy.stepperTitles || StepperLabelPosition.End;
    copy.controlGroups = copy.controlGroups || [];

    if(!copy.buttons) {
      copy.buttons = {};
    }

    copy.buttons.align = copy.buttons.align || ContentAlignment.Right;
    copy.buttons.next = copy.buttons.next || 'Next';
    copy.buttons.previous = copy.buttons.previous || 'Previous';
    copy.buttons.submit = copy.buttons.submit || submit;
    copy.buttons.type = copy.buttons.type || ButtonType.Stroked;

    i = copy.controlGroups.length;

    for(i = 0; i < copy.controlGroups.length; i++) {

      let group = copy.controlGroups[i];

      if(!group.name) {
        group.name = 'group' + i;
      }      
    }

    return copy;

  }

  private createControl(options: FieldOptions): FormControl {

    let control: FormControl;
    let validators: ValidatorFn[] = [];
    let initialValue: any = null;

    if(!options) {
      throw new Error('Unable to create form control. Configuration is null or undefined.');
    }

    if(options.type === ControlType.TextBlock) {
      throw new Error('FormControlType.TextBlock is not supported by CreateControl.')
    }    

    if(options.value) {
      initialValue = options.value;
    }

    if(options.type === ControlType.Timepicker) {
      validators.push(timeValidator);
    }

    if(options.validation) {
      validators = validators.concat(this.builtInValidators(options));      
      control = this.fb.control(initialValue, validators);
    }

    if(validators.length > 0) {
      control = this.fb.control(initialValue, validators);
    }
    else {
      control = this.fb.control(initialValue);  
    }    
      
    return control;

  }

  private createGroup(group: ControlGroup, index?: number): FormGroup {

    let formGroup = this.fb.group([]);

    group.controls.forEach(controlOptions => {
      if(!controlOptions.type || this.supportedType(controlOptions.type)) {
        formGroup.addControl(controlOptions.name, this.createControl(controlOptions));
      }        
    })    

    return formGroup;

  }

  private supportedType(type: ControlType): boolean {

    if(type === ControlType.TextBlock) {
      return false;
    }

    return true;

  }

  private uniqueName(target: any, name: string): boolean {

    if(target[name]) {
      return false;
    }

    target[name] = name;
    return true

  }

}

