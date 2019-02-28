import { Component, OnInit } from '@angular/core';
import { UtilityService, DynamicFormService, FormConfig, ControlType, TextInputOptions, DynamicFormInternals, ToggleOptions, RadioGroupOptions, TextAreaOptions, TextBlockOptions, ToggleMode  } from 'dynamic-form';

@Component({
  selector: 'eb-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  data: DynamicFormInternals;

  constructor(
    private utility: UtilityService,
    private service: DynamicFormService
  ) {}

  ngOnInit() {

    let config = {} as FormConfig;
    
    config.controlGroups = [
      {
        controls: [
          {
            name: 'fullname',
            label: "Full Name",
            type: ControlType.TextInput,
            validation: {
              required: true
            }
          } as TextInputOptions,
          {
            name: 'city',
            label: "City",
            type: ControlType.TextInput
          } as TextInputOptions,
          {
            name: 'registered',
            label: 'Voter Registration',
            text: "Registered voter",            
            type: ControlType.ToogleButton
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

    this.data = this.service.create(config);
    console.log(this.data);

  }

  submit(e: DynamicFormInternals): void {
    console.log('submitted');
    console.log(e);
  }

}
