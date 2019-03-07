import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FieldOptions } from '../models/config.models';

const DefaultMessages = {
  min: 'Minimun value is ${0}. Current: ${1}.',
  max: 'Maximun value is {0}. Current: {1}.',
  required: 'You must enter a value.',
  email: 'Invalid email.',
  minLength: 'Minimun length is {0}. Current: {1}.',
  maxLength: 'Maximun length is {0}. Current: {1}.',
  matDatepickerParse: 'Invalid date',
  pattern: "Value didn't match the expected pattern."
};

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  /**
   * Get first error message from form control
   * @param formControl Form contrl instance.
   * @param options Control options from where label may be used.
   */
  getError(formControl: FormControl, options: FieldOptions): string {

    let errorMsg: string | Function;
    let errorKey: string;
    let msg: string;
    let error: any;    

    if(!formControl.invalid) {
      return null;
    }

    // we only show one error at a time so we will focus on the first one
    errorKey = Object.keys(formControl.errors)[0];
    error = formControl.errors[errorKey];

    if(options.validationMessages && options.validationMessages[errorKey]) {
      errorMsg = options.validationMessages[errorKey];
    }
    else if (DefaultMessages[errorKey]) {
      errorMsg = DefaultMessages[errorKey];
    } 

    switch(errorKey) {
      case 'min':     
        if (typeof errorMsg === "function") {
          msg = errorMsg(options.label, error.min, error.actual);
        }         
        else {
          msg = this.formatString(errorMsg, options.label, error.min, error.actual);
        }
                
      case 'max':
        if (typeof errorMsg === "function") {
          msg = errorMsg(options.label, error.max, error.actual);
        }         
        else {
          msg = this.formatString(errorMsg, options.label, error.max, error.actual);
        }              

      case 'minLength':  
        if (typeof errorMsg === "function") {
          msg = errorMsg(options.label, error.requiredLength, error.actualLength);
        }         
        else {
          msg = this.formatString(errorMsg, options.label, error.requiredLength, error.actualLength);
        }            

      case 'maxLength':
        if (typeof errorMsg === "function") {
          msg = errorMsg(options.label, error.requiredLength, error.actualLength);
        }         
        else {
          msg = this.formatString(errorMsg, options.label, error.requiredLength, error.actualLength)
        }              

      default:
        if (typeof errorMsg === "function") {
          msg = errorMsg(options.label);
        }         
        else {
          msg = this.formatString(errorMsg, options.label);
        }              
    }    

    return msg;

  }  

  /**
   * Formats a string by replacing tokens within parameters.
   * @param message A string to eb formatted containing tokens in the fomat {0} where '0' is the parameter index.
   * @param params Parameters to be inserted in the formatted string.
   */
  formatString(message: string, ...params: any[]): string {
    let m = message;

    if(params && params.length > 0) {
        params.forEach((value, i) => {
            m = m.replace(new RegExp('\\{' + i + '\\}', 'gm'), value);
        });
    }
    return m;
  }  

  /**
   * Performs a deep copy of an object, including complex objects and arrays.
   * @param instance The object to deep copy.
   */
  copy(instance: any) {
    
    let copy: any;
    let i: number;
    let key: string;
  
    if (typeof instance !== 'object') {
      return instance;
    }
    if (!instance) {
      return instance;
    }
  
    if ('[object Array]' === Object.prototype.toString.apply(instance)) {
      copy = [];
      for (i = 0; i < instance.length; i += 1) {
        copy[i] = this.copy(instance[i]);
      }
      return copy;
    }
  
    copy = {};
    for (key in instance) {
      if (instance.hasOwnProperty(key)) {
        copy[key] = this.copy(instance[key]);
      }
    }
    return copy;
  }   

}
