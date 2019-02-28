import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DynamicFormService, UtilityService } from '.';
import { ErrorCodes, ControlGroup, FormConfig, ControlOptions, FieldOptions, ControlType } from '../models';

describe('DynamicFormService', () => {

  let service: DynamicFormService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [ 
        FormBuilder,
        UtilityService,
        DynamicFormService
      ]
    });

    service = TestBed.get(DynamicFormService);

  });

  it('should be created', () => {
    const service: DynamicFormService = TestBed.get(DynamicFormService);
    expect(service).toBeTruthy();
  });

  it('checkControlConfig: cannot be null', () => {

    let config: ControlOptions;

    try{
      service.validateControlOptions(config);
    }
    catch(err) {
      expect((err as Error).name).toBe(ErrorCodes.ControlConfigIsNull);
    }

  })    

  it('checkControlConfig: shoud have a name', () => {

    let config = {
    } as ControlOptions;

    try{
      service.validateControlOptions(config);
    }
    catch(err) {
      expect((err as Error).name).toBe(ErrorCodes.ControlNameIsNull);
    }

  }) 

  it('checkControlConfig: should have a safe name', () => {

    let config = {
      name: '1control'
    } as ControlOptions;

    try{
      service.validateControlOptions(config);
    }
    catch(err) {
      expect((err as Error).name).toBe(ErrorCodes.InvalidName);
    }

  })  

  it('checkGroupConfig: should have a safe name', () => {

    let config = {
      name: '1group'
    } as ControlGroup    

    try{
      service.validateGroupOptions(config);
    }
    catch(err) {
      expect((err as Error).name).toBe(ErrorCodes.InvalidName);
    }
  })   

  it('checkGroupConfig: should have controls', () => {

    let config = {
      name: 'group'
    } as ControlGroup       

    try{
      service.validateGroupOptions(config);
    }
    catch(err) {
      expect((err as Error).name).toBe(ErrorCodes.GroupHasNoControls);
    }
  })   

  it('checkFormConfig: cannot be null', () => {
    try{
      service.validateFormOptions(null);
    }
    catch(err) {
      expect((err as Error).name).toBe(ErrorCodes.ConfigIsNull);
    }
  }) 
  
  it('checkFormConfig: should have control groups', () => {
    let config = {} as FormConfig;

    try{
      service.validateFormOptions(config);
    }
    catch(err) {
      expect((err as Error).name).toBe(ErrorCodes.GroupNullOrEmpty);
    }
  })  

  it('checkFormConfig: group names must be unique if not null', () => {

    let config = {
      controlGroups: [
        {
          title: 'Page 1',
          name: 'group1',
          controls: [
            {
              name: 'firstName',
              type: ControlType.TextInput
            } as ControlOptions,
          ]
        },
        {
          title: 'Page 2',
          name: 'group1',
          controls: [
            {
              name: 'age',
              type: ControlType.TextInput
            } as ControlOptions            
          ]
        },        
      ]
    } as FormConfig;      

    try{
      service.validateFormOptions(config);
    }
    catch(err) {
      expect((err as Error).name).toBe(ErrorCodes.DuplicateGroupName);
    }
  }) 
  
  it('checkFormConfig: control names must be unique', () => {

    let config = {
      controlGroups: [
        {
          title: 'Page 1',
          name: 'group1',
          controls: [
            {
              name: 'firstName',
              type: ControlType.TextInput,
            } as ControlOptions,
          ]
        },
        {
          title: 'Page 2',
          name: 'group2',
          controls: [
            {
              name: 'firstName',
              type: ControlType.TextInput,
            } as ControlOptions            
          ]
        },        
      ]
    } as FormConfig;      

    try{
      service.validateFormOptions(config);
    }
    catch(err) {
      expect((err as Error).name).toBe(ErrorCodes.DuplicateControlName);
    }
  })   

  it('createFormGroup: should return a form group', () => {

    let config = {
      controlGroups: [
        {
          title: 'Page 1',
          controls: [
            {
              name: 'firstName',
              type: ControlType.TextInput
            } as ControlOptions    
          ]
        }
      ]
    } as FormConfig;    

    let data = service.create(config);
    expect(data.form).toEqual(jasmine.any(FormGroup));

  }); 

  it('createFormGroup: auto name groups', () => {

    let config = {
      controlGroups: [
        {
          title: 'Page 1',
          controls: [
            {
              name: 'firstName',
              type: ControlType.TextInput,
            } as ControlOptions,
          ]
        },
        {
          title: 'Page 2',
          name: 'middlegroup',
          controls: [
            {
              name: 'middleName',
              type: ControlType.TextInput,
            } as ControlOptions,
          ]
        },        
        {
          title: 'Page 3',          
          controls: [
            {
              name: 'lastName',
              type: ControlType.TextInput,
            } as ControlOptions,
          ]
        },        
      ]
    } as FormConfig;    

    let form = service.create(config);

    // when group name is not specified it will be: group[index], where index is zero based
    expect(Object.keys((form.form.controls['group0'] as FormGroup).controls).length).toBe(1);
    expect(Object.keys((form.form.controls['middlegroup'] as FormGroup).controls).length).toBe(1);
    expect(Object.keys((form.form.controls['group2'] as FormGroup).controls).length).toBe(1);

  });    

  it('createFormGroup: can have multiple controls in a single group', () => {

    let config = {
      controlGroups: [
        {
          title: 'Page 1',
          name: 'group1',
          controls: [
            {
              name: 'firstName',
              type: ControlType.TextInput,
            } as ControlOptions,
            {
              name: 'lastName',
              type: ControlType.TextInput,
            } as ControlOptions,            
          ]
        }
      ]
    } as FormConfig;    

    let data = service.create(config);

    expect(Object.keys(data.form.controls).length).toBe(2);

  });  

  it('createFormGroup: can have multiple groups', () => {

    let config = {
      controlGroups: [
        {
          title: 'Page 1',
          name: 'group1',
          controls: [
            {
              name: 'firstName',
              type: ControlType.TextInput,
            } as ControlOptions,
          ]
        },
        {
          title: 'Page 2',
          name: 'group2',
          controls: [
            {
              name: 'lastName',
              type: ControlType.TextInput,
            } as ControlOptions,
          ]
        },        
      ]
    } as FormConfig;    

    let form = service.create(config);

    expect(Object.keys((form.form.controls['group1'] as FormGroup).controls).length).toBe(1);
    expect(Object.keys((form.form.controls['group2'] as FormGroup).controls).length).toBe(1);

  });      

  it('createFormGroup: can add required built in validation', () => {

    let config = {
      controlGroups: [
        {
          title: 'Page 1',
          name: 'group1',
          controls: [
            {
              name: 'firstName',
              type: ControlType.TextInput,
              validation: {
                required: true
              }
            } as FieldOptions,
          ]
        }
      ]
    } as FormConfig;    

    let data = service.create(config);
    let control = data.form.controls['firstName'];    
    
    control.setValue(null);
    expect(control.hasError('required')).toBeTruthy();

  });   

  it('createFormGroup: can add min built in validation', () => {

    let config = {
      controlGroups: [
        {
          title: 'Page 1',
          name: 'group1',
          controls: [
            {
              name: 'firstName',
              type: ControlType.TextInput,
              validation: {
                min: 10,
              }
            } as FieldOptions,
          ]
        }
      ]
    } as FormConfig;    

    let data = service.create(config);
    let control = data.form.controls['firstName'];

    control.setValue(1);
    expect(control.hasError('min')).toBeTruthy();

  }); 
  
  it('createFormGroup: can add max built in validation', () => {

    let config = {
      controlGroups: [
        {
          title: 'Page 1',
          name: 'group1',
          controls: [
            {
              name: 'firstName',
              type: ControlType.TextInput,
              validation: {
                max: 10,
              }
            } as FieldOptions,
          ]
        }
      ]
    } as FormConfig;    

    let data = service.create(config);
    let control = data.form.controls['firstName'];

    control.setValue(15);
    expect(control.hasError('max')).toBeTruthy();

  }); 
  
  it('createFormGroup: can add requiredTrue built in validation', () => {

    let config = {
      controlGroups: [
        {
          title: 'Page 1',
          name: 'group1',
          controls: [
            {
              name: 'firstName',
              type: ControlType.TextInput,
              validation: {
                requiredTrue: true,
              }
            } as FieldOptions,
          ]
        }
      ]
    } as FormConfig;    

    let data = service.create(config);
    let control = data.form.controls['firstName'];

    control.setValue(false);
    expect(control.hasError('required')).toBeTruthy();

  });  

  it('createFormGroup: can add email built in validation', () => {

    let config = {
      controlGroups: [
        {
          title: 'Page 1',
          name: 'group1',
          controls: [
            {
              name: 'firstName',
              type: ControlType.TextInput,
              validation: {
                email: true,
              }
            } as FieldOptions,
          ]
        }
      ]
    } as FormConfig;    

    let data = service.create(config);
    let control = data.form.controls['firstName'];

    control.setValue('test.com');
    expect(control.hasError('email')).toBeTruthy();

  });  
  
  it('createFormGroup: can add minLength built in validation', () => {

    let config = {
      controlGroups: [
        {
          title: 'Page 1',
          name: 'group1',
          controls: [
            {
              name: 'firstName',
              type: ControlType.TextInput,
              validation: {
                minLength: 10,
              }
            } as FieldOptions,
          ]
        }
      ]
    } as FormConfig;    

    let data = service.create(config);
    let control = data.form.controls['firstName'];

    control.setValue('abc');
    expect(control.hasError('minlength')).toBeTruthy();

  });    

  it('createFormGroup: can add maxLength built in validation', () => {

    let config = {
      controlGroups: [
        {
          title: 'Page 1',
          name: 'group1',
          controls: [
            {
              name: 'firstName',
              type: ControlType.TextInput,
              validation: {
                maxLength: 1,
              }
            } as FieldOptions,
          ]
        }
      ]
    } as FormConfig;    

    let data = service.create(config);
    let control = data.form.controls['firstName'];

    control.setValue('ABC');
    expect(control.hasError('maxlength')).toBeTruthy();

  }); 
  
  it('createFormGroup: can add pattern built in validation', () => {

    let config = {
      controlGroups: [
        {
          title: 'Page 1',
          name: 'group1',
          controls: [
            {
              name: 'firstName',
              type: ControlType.TextInput,
              validation: {
                pattern: '^[a-zA-Z][a-zA-Z0-9]*$',
              }
            } as FieldOptions,
          ]
        }
      ]
    } as FormConfig;    

    let data = service.create(config);
    let control = data.form.controls['firstName'];

    control.setValue('1value');
    expect(control.hasError('pattern')).toBeTruthy();

  });  

  it('safeName: should allow alphanumeric name', () => {
    const service: DynamicFormService = TestBed.get(DynamicFormService);
    expect(service.safeName('some1name')).toBeTruthy();
  });  

  it('safeName: should not allow name starting with a number', () => {
    const service: DynamicFormService = TestBed.get(DynamicFormService);
    expect(service.safeName('1test')).toBeFalsy();
  });

  it('safeName: should not allow name spaces', () => {
    const service: DynamicFormService = TestBed.get(DynamicFormService);
    expect(service.safeName('some name')).toBeFalsy();
  });  

  it('safeName: should not allow name with special charater', () => {
    const service: DynamicFormService = TestBed.get(DynamicFormService);
    expect(service.safeName('some !name')).toBeFalsy();
  });    

});
