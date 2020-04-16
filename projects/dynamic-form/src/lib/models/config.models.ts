import { FormGroup, } from '@angular/forms';
import { ControlType, DatePickerViewMode, LabelDisplayMode, Appearance, ContentAlignment, ToggleMode, Color, ButtonType, StepperLabelPosition } from './common.models';

export interface ButtonOptions {    
    text?: string;
    color?: Color,        
}

export interface ControlExpressions {
    disabled: string,
    visible: string
}

export interface ControlGroup {
    title?: string,    
    name?: string,
    controls: ControlOptions[]    
}

export interface ControlOptions {
    name: string,
    type?: ControlType,
    expressions?: ControlExpressions
}

export interface DatePickerOptions extends ExtendedFieldOptions {
    maxDate?: Date,
    minDate?: Date,
    startDate: Date,
    value?: Date,
    activeView?: DatePickerViewMode
}

export interface DropdownOptions extends ExtendedFieldOptions {
    items?: SelectItem[]
}

export interface Expressions {
    disabled: string,
    visible: string
}

export interface ExtendedFieldOptions extends FieldOptions {    
    labelMode?: LabelDisplayMode,
    appearance?: Appearance,
    hint?: string,    
    placeholder?: string, 
    width?: string 
}

export interface FieldOptions extends ControlOptions {
    label?: string,
    validation?: Validation,
    validationMessages?: ValidationMessages,
    value?: any
}

export interface FormButtons {    
    align?: ContentAlignment,
    type?: ButtonType,
    next?: string | ButtonOptions,
    previous?: string | ButtonOptions,
    submit?: string | ButtonOptions
}

export interface FormConfig {
    appearance?: Appearance,
    labels?: LabelDisplayMode,
    inputWidth?: string   
    stepperTitles?: StepperLabelPosition,     
    buttons?: FormButtons,   
    controlGroups: ControlGroup[],
}

export interface Model {
    [controlName: string] : any
}

export interface MultiSelectOptions extends FieldOptions {
    items?: SelectItem[]
}

export interface NumericInputOptions extends ExtendedFieldOptions {
    align?: ContentAlignment,
    value?: number,
    prefix?: string,
    sufix?: string,
    decimals?: number,
    decimalSeparator?: string
}

export interface RadioGroupOptions extends FieldOptions {
    items?: SelectItem[]
}

export interface SelectItem {
    text: string,
    value?: any
}

export interface StepSelectionEvent {
    formData: DynamicFormInternals,
    previouslySelectedIndex: number,
    selectedIndex: number,
    sender: any
}

export interface TextAreaOptions extends ExtendedFieldOptions {
    value?: string,
    rows?: number
}

export interface TextBlockOptions extends ControlOptions {
    label?: string,
    text?: string
}

export interface TextInputOptions extends ExtendedFieldOptions {
    align?: ContentAlignment,
    value?: string,
    mask?: string,
    prefix?: string,
    sufix?: string
}

export interface TimeDefinition {
    hour: string,
    min: string,
    period: string
}

export interface TimePickerOptions extends ExtendedFieldOptions {
    value?: string
}

export interface ToggleOptions extends FieldOptions {
    value?: boolean,
    text?: string,
    toggleMode?: ToggleMode
}

export interface Validation {
    min: number,
    max: number,
    required: boolean,
    requiredTrue: boolean,
    email: boolean,
    minLength: number,
    maxLength: number,
    pattern: string,    
}

export interface ValidationMessages {
    min: string | ((label: string, min: number, actual: number) => string) | (() => string),
    max: string | ((label: string, max: number, actual: number) => string) | (() => string),
    required: string | ((label?: string) => string) | (() => string),
    email: string | ((label: string) => string) | (() => string),
    minLength: string | ((label: string, minLength: number, actualLength: number) => string) | (() => string),
    maxLength: string | ((label: string, maxLength: number, actualLength: number) => string) | (() => string),
    pattern: string | ((label: string) => string) | (() => string),
}

export class Time implements TimeDefinition {
    constructor(public hour: string, public min: string, public period: string){}
}

export class DynamicFormInternals {

    private _options: FormConfig;
    private _form: FormGroup;
    private _disabled: boolean;

    get disabled(): boolean {
        return this._disabled;
    }

    get form(): FormGroup {
        return this._form;
    }

    get settings(): FormConfig {
        return this._options;
    }
  
    constructor(form: FormGroup, options: FormConfig) {
        this._form = form;
        this._options = options;
    }

    setDisabled(): void {
        this._disabled = true;
    }

    setEnabled(): void {
        this._disabled = false;
    }    

    value(): Model {

        let fgroup: FormGroup;
        let model: Model = this.buildModel();

        if(this._options.controlGroups.length > 1) {

            this._options.controlGroups.forEach(ctg => {           

                fgroup = this._form.get(ctg.name) as FormGroup;
                model = {
                    ...model,
                    ...fgroup.value
                };
    
            })            

        }
        else if(this._options.controlGroups.length === 1) {

            model = {
                ...model,
                ...this._form.value
            };            

        }
    
        return model;
      
    }    

    private buildModel(): Model {

        let model: Model = {};
        
        this._options.controlGroups.forEach(ctg => {           
            if(ctg.controls) {
                ctg.controls.forEach(ctl => {
                    if(ctl.type && ctl.type !== ControlType.TextBlock) {
                        model[ctl.name] = null;
                    }
                })
            }            
        })

        return model;

    }

}