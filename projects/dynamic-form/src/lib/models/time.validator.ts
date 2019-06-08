import { AbstractControl, ValidationErrors } from '@angular/forms';
import { coerceNumberProperty } from '@angular/cdk/coercion';
import { TimeDefinition, Time } from './config.models';

export function timeValidator(control: AbstractControl): ValidationErrors | null  {

  if(!control || !control.value) {
    return null;
  }

  let value: TimeDefinition =  timeFromString(control.value);
  let err = { timeError: true };

  if(!value.hour && !value.min) {
    return null;
  }  

  if(!value.hour || !value.min) {
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

  if(!period || (period.toLowerCase() != 'am' && period.toLowerCase() != 'pm')) {
    return err;
  }

  return null;    

}  

export function timeFromString(stringValue: string): TimeDefinition {

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