import { TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';

import { UtilityService } from '.';
import { TextInputOptions } from '../models';

describe('FormUtilityService', () => {  

  let service: UtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
        UtilityService
      ]
    });
    
    service = TestBed.get(UtilityService);    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('format: should work without params', () => {
    let str = 'Some message.';
    expect(service.formatString(str)).toBe(str);
  });

  it('format: should work with params but no tokens', () => {
    let str = 'Some message.';
    expect(service.formatString(str, 'value1')).toBe(str);
  });

  it('format: should replace tokens', () => {
    let str = 'Some {0} message {1}.';
    expect(service.formatString(str, 'value1', 'value2')).toBe('Some value1 message value2.');
  });

  it('format: should replace same token multiple times', () => {
    let str = 'Some {0} message {1} {0}.';
    expect(service.formatString(str, 'value1', 'value2')).toBe('Some value1 message value2 value1.');
  });  

  it('format: should work with less params then tokens', () => {
    let str = 'Some {0} message {1}.';
    expect(service.formatString(str, 'value1')).toBe('Some value1 message {1}.');
  });

  it('format: should work with less tokens then params', () => {
    let str = 'Some {0} message.';
    expect(service.formatString(str, 'value1', 'value2')).toBe('Some value1 message.');
  });  

  it('format: should not replace when brackets are not surrounding numbers', () => {
    let str = 'Some {value} message.';
    expect(service.formatString(str, 'value1')).toBe('Some {value} message.');
  });

  it('format: should accept double brackets', () => {
    let str = 'Some {{0}} message.';
    expect(service.formatString(str, 'value1')).toBe('Some {value1} message.');
  }); 
  
  it('getError: shou return message from function', () => {
    let control = new FormControl(null, Validators.required);
    let options = {
      label: 'control',
      validationMessages: {
        required: (label) => `Requires ${label}.`
      }
    } as TextInputOptions;

    control.setErrors(control.validator(control));
    expect(service.getError(control, options)).toBe('Requires control.');
  });

  it('getError: should parse formatted string', () => {
    let control = new FormControl(null, Validators.required);
    let options = {
      label: 'control',
      validationMessages: {
        required: 'Custom message {0}.'
      }
    } as TextInputOptions;

    control.setErrors(control.validator(control));
    expect(service.getError(control, options)).toBe('Custom message control.');
  });  

  it('getError: should return default message', () => {
    let control = new FormControl(null, Validators.required);
    let options = {
      label: 'control',
    } as TextInputOptions;

    control.setErrors(control.validator(control));
    expect(service.getError(control, options)).toBe('You must enter a value.');
  });    
 

});
