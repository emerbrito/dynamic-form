import { Component, OnInit, OnChanges, Input, ViewEncapsulation, Output, EventEmitter, ViewChild, SimpleChanges, SimpleChange } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material';
import { Observable } from 'rxjs';
import { 
  FormConfig, 
  ButtonType,
  ButtonOptions,
  DynamicFormInternals,
  StepSelectionEvent,
  Model} from '../models';

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

  @ViewChild('stepper') stepper: MatStepper;
  config: FormConfig;
  formGroup: FormGroup;

  constructor() { }
  
  get basicButtons(): boolean {
    return this.config.buttons.type === ButtonType.Basic;
  }

  get buttonAlignment(): string {
    return this.config.buttons.align; 
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

    let data: SimpleChange = changes.internals
    let value: DynamicFormInternals

    if(data && data.currentValue) {      
      value = data.currentValue;
      if(this.stepper) {
        this.stepper.reset();
      }
      this.config = value.settings;
      this.formGroup = value.form;
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
