import { Component, OnInit, OnChanges, Input, ViewEncapsulation, Output, EventEmitter, ViewChild, SimpleChanges, SimpleChange } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material';
import { Observable } from 'rxjs';
import { ButtonType } from '../models/common.models';
import { FormConfig, ButtonOptions, DynamicFormInternals, StepSelectionEvent, Model } from '../models/config.models';

@Component({
  selector: 'eb-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DynamicFormComponent implements OnInit, OnChanges {

  @Output() submitted: EventEmitter<DynamicFormInternals> = new EventEmitter<DynamicFormInternals>();   
  @Output() stepChange: EventEmitter<StepSelectionEvent> = new EventEmitter<StepSelectionEvent>();        
  @Input() internals: DynamicFormInternals;  
  @Input() disabled: boolean;  

  @ViewChild('stepper') stepper: MatStepper;
  config: FormConfig;
  formGroup: FormGroup;
  controlsFullPath: { [key:string]: string } = {};

  constructor() { }
  
  get basicButtons(): boolean {
    return this.config.buttons.type === ButtonType.Basic;
  }

  get buttonAlignment(): string {
    return this.config.buttons.align; 
  }

  get disableSubmit(): boolean {
    return this.formGroup.disabled || this.formGroup.invalid;
  }

  get fabButtons(): boolean {    
    return this.config.buttons.type === ButtonType.Fab;
  }  

  get flatButtons(): boolean {    
    return this.config.buttons.type === ButtonType.Flat;
  } 

  get multiPage(): boolean {
    return this.config.controlGroups.length > 1;
  }

  get singlePage(): boolean {
    return this.config.controlGroups.length === 1;
  }

  get raisedButtons(): boolean {    
    return this.config.buttons.type === ButtonType.Raised;
  }  
  
  get stepperLabelPosition(): string {
    return this.config.stepperTitles;
  }

  get strokedButtons(): boolean {    

    return this.config.buttons.type === ButtonType.Stroked;

  }  
  
  get valid(): boolean {
    return this.formGroup.valid;
  }    

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    let changesInternals: SimpleChange = changes.internals;
    let changesDisabled: SimpleChange = changes.disabled;
    let value: DynamicFormInternals

    if(changesInternals && changesInternals.currentValue) {      
      value = changesInternals.currentValue;
      if(this.stepper) {
        this.stepper.reset();
      }
      
      this.controlsFullPath = this.mapPath(value.settings);
      this.config = value.settings;
      this.formGroup = value.form;         
    }

    if(changesDisabled != null) {
      if(changesDisabled.currentValue == true) {
        this.formGroup.disable();
      }
      else {
        this.formGroup.enable();
      }
    }

  }

  reset(): void {
    if(this.stepper) {
      this.stepper.reset();
    }    
    else {
      this.formGroup.reset();
    }
  } 

  buttonColor(buttonName: string) {

    let button: string | ButtonOptions;
    let color: string = buttonName === 'submit' ? 'accent' : null;

    if(this.config.buttons[buttonName]) {

      button = this.config.buttons[buttonName];

      if(typeof button === 'string' || button instanceof String) {
        // no color defined, when configuration type is string it is only the button name
        return color;
      }

      if(button.color) {
        color = button.color;
      }

    }

    return color;

  }

  buttonText(buttonName: string) {

    let button: string | ButtonOptions;
    let text: string;

    // set defaults
    switch(buttonName) {
      case 'previous':
        text = "Previous";
        break;
      case 'next':
        text = "Next";
        break;
      case 'submit':
        text = "Submit";
        break;          
    }

    // override with settings if available

    if(this.config.buttons[buttonName]) {

      button = this.config.buttons[buttonName];

      if(typeof button === 'string' || button instanceof String) {
        // when configuration type is string it is only the button name
        return button;
      }

      if(button.text) {
        text = button.text;
      }

    }

    return text;

  }

  mapPath(config: FormConfig): { [key:string]: string } {

    let path = {};
    let length = config.controlGroups.length;

    if(config.controlGroups.length == 1) {
      // single page form, all controls are at the root level.
      const group = config.controlGroups[0];
      group.controls.forEach(ctl => {
        path[ctl.name] = ctl.name;
      });
    }
    else {
      // more than one group.
      // in multi page scenarions each control are nested under page.
      for (let i = 0; i < length; i++) {
        const group = config.controlGroups[i];
        group.controls.forEach(ctl => {
          path[ctl.name] = `${group.name || 'group' + i}.${ctl.name}`
        })      
      }
    }

    return path;
  }

  onSubmit(): void {
    this.submitted.emit(this.internals);
  }

  stepChanged(event: StepperSelectionEvent): void {

    let e: StepSelectionEvent = {
      formData: this.internals,
      previouslySelectedIndex: event.previouslySelectedIndex,
      selectedIndex: event.selectedIndex,
      sender: event
    }

    this.stepChange.emit(e);

  }

  statusChanges(): Observable<any> {
    return this.formGroup.statusChanges;
  }

  value(): Model {
    return this.internals.value()
  }

}
