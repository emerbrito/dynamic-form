import { AbstractControl, ValidationErrors } from '@angular/forms';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { TimeDefinition, Time } from './config.models';

export function timeValidator(control: AbstractControl): ValidationErrors | null  {

  if(!control || !control.value) {
    return null;
  }

  let value: TimeDefinition =  timeFromString(control.value);
  let err = { timeError: true };

  // unable to parse
  if(value === null) {
    return err; 
  }

  if(!value.hour && !value.min && !value.period) {
    return null;
  }  

  if(!value.hour || !value.min || !value.period) {
    return err;
  }

  let hours = coerceNumberProperty(value.hour, 0);
  let min = coerceNumberProperty(value.min, 0);
  let period = value.period;

  if(!hours || hours > 12) {
    return err;
  }

  if(min > 59) {
    return err;
  }    

  if(period.toLowerCase() != 'am' && period.toLowerCase() != 'pm') {
    return err;
  }

  return null;    

}  

export function timeFromString(stringValue: string): TimeDefinition {

  let emptyValue = new Time('','','');

  if(!stringValue) {
    return emptyValue;
  }

  const regex = /(\d{1,2}):(\d{1,2})(\s{1,})(am|pm)/i;
  const parts = stringValue.match(regex);


  if(!parts) {
    return null;
  }  

  let part1: string = parts[1];
  let part2: string = parts[2];
  let part3: string = parts[4];

  return new Time(part1, part2, part3);
} 
