import { Component, OnInit, OnDestroy, Input, HostBinding, Optional, Self, ElementRef, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, NgControl, ControlValueAccessor, Validators, FormControlDirective, FormControl, Validator, NG_VALIDATORS } from '@angular/forms';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatFormFieldControl } from '@angular/material';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { TimeDefinition, Time } from '../../models/config.models';
import { timeValidator } from '../../models/time.validator';

@Component({
  selector: 'eb-time-picker-control',
  templateUrl: './time-picker-control.component.html',
  styleUrls: ['./time-picker-control.component.css'],
  providers: [
    { provide: MatFormFieldControl, useExisting: TimePickerControlComponent}
  ]
})
export class TimePickerControlComponent implements MatFormFieldControl<string>, ControlValueAccessor, OnInit, OnDestroy {

  private _disabled = false;
  private _placeholder: string;
  private _required = false;

  static nextId = 0;
  @HostBinding('attr.aria-describedby') describedBy = '';
  @HostBinding() id = `eb-time-picker-control-${TimePickerControlComponent.nextId++}`;

  controlType = 'eb-time-picker-control';
  errorState = false;
  focused = false;
  parts: FormGroup;
  stateChanges = new Subject<void>();  
  errorStateSubs: Subscription;
  valueChangeSubs: Subscription;
  
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }

  get empty() {
    let t = this.parts.value;
    return t.hour == null && t.min == null && !t.subscriber;
  }  

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req) {
    this._required = coerceBooleanProperty(req);
    this.stateChanges.next();
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @Input()
  get value(): string | null {
    let t = this.parts.value as TimeDefinition;
    return this.timeToString(t);
  }
  set value(time: string | null) {    
    let t = this.timeFromString(time);
    this.parts.setValue({
      hour: t.hour,
      min: t.min,
      period: t.period
    });
    this.onChange(time);
    this.onTouched();
    this.stateChanges.next();    
  }
  
  constructor
  (
    private fb: FormBuilder,
    private fm: FocusMonitor, 
    private elRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl
  ) 
  { 

    this.parts = fb.group({
      hour: ['', Validators.pattern("([0]?[1-9]|1[0-2])")],
      min: '',
      period: ''
    });

    fm.monitor(elRef.nativeElement, true).subscribe(origin => {
      this.focused = !!origin;
      this.stateChanges.next();
    });    

    if (this.ngControl != null) {
      // Setting the value accessor directly (instead of using
      // the providers) to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    } 
    
  }

  ngOnInit() {

    if(this.ngControl) {

      this.errorStateSubs = this.ngControl.valueChanges
        .pipe(
          distinctUntilChanged()
        )
        .subscribe(v => {

          if(this.errorState != this.ngControl.invalid) {
            this.errorState = this.ngControl.invalid;
            this.stateChanges.next();
          }

        });

        this.valueChangeSubs = this.parts.valueChanges
        .pipe(
          distinctUntilChanged()
        )
        .subscribe(value => {

          let stringValue = this.timeToString(value);

          this.onChange(stringValue);
          this.onTouched();         
          this.stateChanges.next();
        });        

    }

  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
    if(this.errorStateSubs) this.errorStateSubs.unsubscribe();
    if(this.valueChangeSubs) this.valueChangeSubs.unsubscribe();
  }

  timeToString(time: TimeDefinition): string {

    let hours = time.hour ? time.hour.trim() : '';
    let min = time.min ? time.min.trim() : '';
    let period = time.period ? time.period.trim() : '';

    if(!hours && !min) {
      return null;
    }

    return `${hours}:${min} ${period}`;
  }

  timeFromString(stringValue: string): TimeDefinition {

    let emptyValue = new Time('','','');

    if(!stringValue) {
      return emptyValue;
    }

    let part1: string;
    let part2: string;
    let part3: string;
    let sepIndex: number;

    sepIndex = stringValue.indexOf(':');
    part1 = stringValue.substr(0, sepIndex).trim();

    stringValue = stringValue.replace(part1+':', '');
    sepIndex = stringValue.trim().indexOf(' ');
    part2 = stringValue.substr(0, sepIndex).trim();
    part3 = stringValue.replace(part2, '').trim();

    if(isNaN(part1 as any)) {
      return emptyValue;
    }

    if(isNaN(part2 as any)) {
      return emptyValue;
    }    

    if(part3.toLowerCase() !== 'am' && part3.toLowerCase() != 'pm') {
      return emptyValue;
    }    

    return new Time(part1, part2, part3);
  }  

  // MatFormFieldControl implementation

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this.elRef.nativeElement.querySelector('input').focus();
    }
  }  

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }  

  // ControlValueAccessor implementation

  onChange: any = () => { };
  onTouched: any = () => { };

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }  

  writeValue(obj: any): void {
    this.value = obj;
  }  

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
