import { Component, OnInit, ViewChild } from '@angular/core';

import { UtilityService } from 'projects/dynamic-form/src/lib/services/utility.service';
import { DynamicFormService } from 'projects/dynamic-form/src/lib/services/dynamic-form.service';
import { FormConfig, TextInputOptions, DynamicFormInternals, ToggleOptions, DatePickerOptions, DropdownOptions, RadioGroupOptions, TextAreaOptions, TextBlockOptions, NumericInputOptions, TimePickerOptions, ControlOptions } from 'projects/dynamic-form/src/lib/models/config.models';
import { ControlType, ToggleMode } from 'projects/dynamic-form/src/lib/models/common.models';
import { DynamicFormComponent } from 'projects/dynamic-form/src/lib/dynamic-form/dynamic-form.component';
import { map, pairwise } from 'rxjs/operators';
//import { UtilityService, DynamicFormService, FormConfig, ControlType, TextInputOptions, DynamicFormInternals, ToggleOptions, RadioGroupOptions, TextAreaOptions, TextBlockOptions, ToggleMode  } from 'dynamic-form';

@Component({
  selector: 'eb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  @ViewChild('survey') form: DynamicFormComponent;
  data: DynamicFormInternals;
  formDisabled: boolean = false;

  constructor(
    private utility: UtilityService,
    private service: DynamicFormService
  ) {}

  ngOnInit() {

    let config = {} as FormConfig;
    let sampleData: { [key:string]: any} = {}

    config.controlGroups = [
      {
        controls: [
          {
            name: 'enterTime',
            label: "Enter Time",
            type: ControlType.RadioGroup,
            items: [
              { value: 1, text: 'Yes' },
              { value: 2, text: 'No' }
            ]
          } as RadioGroupOptions,
          {
            name: 'enterDate',
            label: 'Enter Date',
            type: ControlType.Datepicker,
            minDate: "2021-12-01",
            preventToday: true
          } as any,
          {
            name: 'time',
            label: "Time",
            type: ControlType.Timepicker,
            //value: '12:45 PM',
            expressions: {
              visible: "${enterTime} === 1"
            }
          } as TimePickerOptions,
          {
            name: 'fullname',
            label: "Full Name",
            type: ControlType.TextInput,
            validation: {
              required: true
            }
          } as TextInputOptions,
          {
            name: 'age',
            label: "Age",
            type: ControlType.NumericInput,
            validation: {
              max: 55,
              min: 18
            }
          } as NumericInputOptions,
          {
            name: 'city',
            label: "City",
            type: ControlType.TextInput,
            hint: 'Enter the city name'
          } as TextInputOptions,
          {
            name: 'registered',
            label: 'Voter Registration',
            text: "Registered voter",
            type: ControlType.ToogleButton,
            expressions: {
              visible: "${age} > 18"
            }
          } as ToggleOptions,
          {
            name: 'affiliation',
            label: "Party Affiliation",
            type: ControlType.RadioGroup,
            items: [
              { value: 1, text: 'Democratic' },
              { value: 2, text: 'Republican' },
              { value: 3, text: 'Independent' }
            ],
            expressions: {
              disabled: '!${registered};'
            }
          } as RadioGroupOptions,
          {
            name: 'countries',
            label: "Countries Visited Past 6 Months",
            type: ControlType.MultiSelect,
            items: [
              { value: 1, text: 'Brazil' },
              { value: 2, text: 'Colombia' },
              { value: 3, text: 'USA' },
              { value: 4, text: 'Spain' },
            ],
            expressions: {
              //disabled: '!${registered};'
            }
          } as RadioGroupOptions,
          {
            name: 'countriesRadio',
            label: "Countries Visited Past 6 Months",
            type: ControlType.RadioGroup,
            items: [
              { value: 1, text: 'Brazil' },
              { value: 2, text: 'Colombia' },
              { value: 3, text: 'USA' },
              { value: 4, text: 'Spain' },
            ],
            expressions: {
              //disabled: '!${registered};'
            }
          } as RadioGroupOptions,
          {
            name: 'country',
            label: "Country Visiting next",
            type: ControlType.Dropdown,
            items: [
              { value: 1, text: 'Brazil?' },
              { value: 2, text: 'Colombia' },
              { value: 3, text: 'USA' },
              { value: 4, text: 'Spain' },
            ]
          } as DropdownOptions
        ]
      },
      {
        controls: [
          {
            name: 'comments',
            label: "Comments",
            type: ControlType.TextArea
          } as TextAreaOptions,
          {
            name: 'terms',
            type: ControlType.TextBlock,
            label: 'Terms and Conditions',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus scelerisque eros ut lacus porta, ut fringilla velit vulputate. Vestibulum eu purus quis velit cursus iaculis. Etiam metus enim, varius et semper sit amet, posuere eu urna. Aliquam ac neque arcu. Nunc aliquam purus quis nisi elementum, eget dignissim velit egestas. Nulla bibendum libero ante, a egestas neque blandit eu. Praesent at tincidunt neque, id dignissim nisi.<br/><br/>Etiam posuere risus ut ex pulvinar convallis. Etiam id blandit est, ut convallis ligula. Proin feugiat ultrices ex ut ullamcorper. Fusce accumsan, mi fringilla condimentum tincidunt, turpis enim fringilla mauris, a maximus magna purus nec libero. Morbi molestie ornare pellentesque. In sed iaculis arcu. Nam id nisi porttitor, ornare turpis euismod, venenatis mauris. Nulla facilisi.',
          } as TextBlockOptions,
          {
            name: 'agree',
            type: ControlType.ToogleButton,
            text: 'I Agree to the terms and conditions.',
            toggleMode: ToggleMode.SlideToggle,
            validation: {
              requiredTrue: true
            },
            validationMessages: {
              required: 'You must agree to the terms and conditions'
            }
          } as ToggleOptions
        ]
      },
    ];

    // sampleData = {
    //   fullname: 'John Doe',
    //   affiliation: 3,
    //   registered: true,
    //   agree: true,
    //   countries: [2,4]
    // }

    this.data = this.service.create(config, sampleData);
    //this.data.form.valueChanges.subscribe(v => console.log('form', v));

    //https://gist.github.com/oleksandrstarov/a3e1c764179639b08961e5ab56b89003

    this.data.form.valueChanges
    .pipe(
      pairwise(),
      map(([prev, curr]) => Object.keys(curr).find(key => prev[key] !== curr[key]))
    )
    .subscribe(key => console.log(key, this.data.form.controls[key].value));

  }

  submit(e: DynamicFormInternals): void {
    console.log('submitted');
    console.log(e);
    console.log(e.value());
    this.formDisabled = true;
    this.form.stepper.selectedIndex = 0;
  }

}
