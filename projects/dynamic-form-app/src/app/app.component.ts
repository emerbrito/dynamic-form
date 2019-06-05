import { Component, OnInit } from '@angular/core';

import { UtilityService } from 'projects/dynamic-form/src/lib/services/utility.service';
import { DynamicFormService } from 'projects/dynamic-form/src/lib/services/dynamic-form.service';
import { FormConfig, TextInputOptions, DynamicFormInternals, ToggleOptions, RadioGroupOptions, TextAreaOptions, TextBlockOptions, NumericInputOptions } from 'projects/dynamic-form/src/lib/models/config.models';
import { ControlType, ToggleMode } from 'projects/dynamic-form/src/lib/models/common.models';
//import { UtilityService, DynamicFormService, FormConfig, ControlType, TextInputOptions, DynamicFormInternals, ToggleOptions, RadioGroupOptions, TextAreaOptions, TextBlockOptions, ToggleMode  } from 'dynamic-form';

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
    let sampleData: { [key:string]: any} = {}
    
    config.controlGroups = [{
      "title": "First Page",
      "name": "page_73838066_8446_4a53_b007_a2cdd820a4a3",
      "pageNumber": 1,
      "controls": [{
        "sortOrder": 25,
        "optionSet": false,
        "name": "question_882ac7ef_5a04_43d2_8802_84b1c3fcabba",
        "type": "datepicker",
        "label": "Date Control Type",
        "validation": {
          "required": false,
          "email": false
        }
      },  {
        "sortOrder": 26,
        "optionSet": false,
        "expressions": {
          "visible": "(${question_882ac7ef_5a04_43d2_8802_84b1c3fcabba} >= new Date(2019, 6, 1, 0, 0, 0, 0))"
        },
        "name": "question_86851bd3_cc1e_479b_ba6c_12672587efa5",
        "type": "input",
        "label": "Visible if Date is equals or greater 07/01/2019",
        "validation": {
          "required": false,
          "email": false
        }
      }, {
        "sortOrder": 50,
        "optionSet": false,
        "name": "question_1fe2ca70_4052_4bc8_b0d6_1b7363d3ee03",
        "type": "input",
        "label": "Email input",
        "validation": {
          "required": false,
          "email": true
        }
      }, {
        "sortOrder": 51,
        "optionSet": false,
        "expressions": {
          "visible": "(${question_1fe2ca70_4052_4bc8_b0d6_1b7363d3ee03} == 'test@test.com')"
        },
        "name": "question_da475dfe_b52d_4a8c_af51_f30c9b32c72b",
        "type": "input",
        "label": "Visible if Email (text) equals test@test.com",
        "validation": {
          "required": false,
          "email": false
        }
      }, {
        "sortOrder": 70,
        "optionSet": false,
        "name": "question_8216cce5_9700_4c0d_b530_d3bc89588700",
        "type": "numeric",
        "label": "Number Control Type",
        "validation": {
          "min": 1.0000000000,
          "max": 100.0000000000,
          "required": false,
          "email": false
        },
        "decimals": 3
      }, {
        "sortOrder": 71,
        "optionSet": false,
        "expressions": {
          "visible": "(${question_8216cce5_9700_4c0d_b530_d3bc89588700} > 20)"
        },
        "name": "question_f3a4fe2f_1eeb_4b18_a03b_76b2620dcd18",
        "type": "input",
        "label": "Visible if number control is greater than 20",
        "validation": {
          "required": false,
          "email": false
        }
      }, {
        "sortOrder": 71,
        "optionSet": false,
        "name": "question_34a16afc_f491_4e3c_be6d_321c37e03f09",
        "type": "input",
        "label": "Injected Templates Question (Text Control Type)",
        "validation": {
          "required": false,
          "email": false
        }
      },{
        "sortOrder": 201,
        "optionSet": false,
        "expressions": {
          "visible": "(${question_e839dce4_d028_4391_8e20_d259b8ec5468} == '5')"
        },
        "name": "question_ff87f373_cf83_43f7_875e_a5da5efdeab7",
        "type": "input",
        "label": "Visible if dropdown control value is 'Test 2'",
        "validation": {
          "required": false,
          "email": false
        }
      }, {
        "sortOrder": 500,
        "optionSet": false,
        "name": "question_7c9f33b8_cc18_43a7_8a84_2d83411dfddf",
        "type": "radiogroup",
        "label": "Radio Group Control Type",
        "validation": {
          "required": false,
          "email": false
        },
        "items": [{
          "text": "Test Option 1",
          "value": "4"
        }, {
          "text": "Test Option 2",
          "value": "5"
        }, {
          "text": "Test Option 3",
          "value": "6"
        }]
      }, {
        "sortOrder": 501,
        "optionSet": false,
        "expressions": {
          "visible": "(${question_7c9f33b8_cc18_43a7_8a84_2d83411dfddf} == '6')"
        },
        "name": "question_03087ea4_aff6_4e1f_86c3_ce6343874a1a",
        "type": "input",
        "label": "Visible if radio group value is 'Test 3'",
        "validation": {
          "required": false,
          "email": false
        }
      }, {
        "sortOrder": 600,
        "optionSet": false,
        "name": "question_122652f9_65ef_40b0_8c6d_5de9c8275792",
        "type": "input",
        "label": "Text Control Type",
        "validation": {
          "required": true,
          "email": false
        },
        "hint": "This is a hint",
        "placeholder": "Enter something here"
      }, {
        "sortOrder": 700,
        "optionSet": false,
        "name": "question_bb072a1f_aabc_41e6_94de_577ac03aa1ce",
        "type": "tooglebutton",
        "label": "Toggle Control Type",
        "validation": {
          "required": false,
          "email": false
        },
        "toggleMode": "slidetoggle"
      }, {
        "sortOrder": 701,
        "optionSet": false,
        "expressions": {
          "visible": "(${question_bb072a1f_aabc_41e6_94de_577ac03aa1ce} == true)"
        },
        "name": "question_3299d4b2_e9b6_4a41_9e83_6fb4c968b7dd",
        "type": "input",
        "label": "Visible if toggle control type is true",
        "validation": {
          "required": false,
          "email": false
        }
      }, {
        "sortOrder": 800,
        "optionSet": false,
        "name": "question_4bad9f6b_610d_4698_bb9d_3d900480fa17",
        "type": "textblock",
        "validation": {
          "required": false,
          "email": false
        },
        "text": "This is a text block.\nNew is a new line."
      }, {
        "sortOrder": 900,
        "optionSet": true,
        "name": "question_8da0ee52_c487_4fba_a533_a4879c076dfc",
        "type": "dropdown",
        "label": "Option Set Control Type",
        "validation": {
          "required": false,
          "email": false
        },
        "items": [{
          "text": "Not stressed",
          "value": 969750000
        }, {
          "text": "Somewhat stressed",
          "value": 969750001
        }, {
          "text": "Very stressed",
          "value": 969750002
        }, {
          "text": "Yes - Regularly (2)",
          "value": 969750003
        }, {
          "text": "Yes - Sometimes (1)",
          "value": 969750004
        }, {
          "text": "No (0)",
          "value": 969750005
        }]
      }, {
        "sortOrder": 1000,
        "optionSet": false,
        "name": "question_7f9b6afa_fdbe_4efd_a840_e187be617bf2",
        "type": "multiselect",
        "label": "Select countries you visited in the past 6 months",
        "validation": {
          "required": false,
          "email": false
        },
        "items": [{
          "text": "Brazil",
          "value": "1"
        }, {
          "text": "Colombia",
          "value": "2"
        }, {
          "text": "Spain",
          "value": "3"
        }, {
          "text": "USA",
          "value": "7"
        }]
      }]
    }, {
      "title": "Second Page",
      "name": "page_6bf24a33_626e_40c5_92fd_3956032272fa",
      "pageNumber": 2,
      "controls": [{
        "sortOrder": 200,
        "optionSet": false,
        "name": "question_e839dce4_d028_4391_8e20_d259b8ec5468",
        "type": "dropdown",
        "label": "Dropdown Control Type",
        "validation": {
          "required": false,
          "email": false
        },
        "items": [{
          "text": "Test Option 1",
          "value": "4"
        }, {
          "text": "Test Option 2",
          "value": "5"
        }]
      }, {
        "sortOrder": 300,
        "optionSet": false,
        "name": "question_cae30f92_ae9f_4e0a_9f16_cdabb0ae3450",
        "type": "textarea",
        "label": "Multi-line Control Type",
        "validation": {
          "required": false,
          "email": false
        }
      }]
    }] as any[];

    // config.controlGroups = [
    //   {
    //     controls: [
    //       {
    //         name: 'fullname',
    //         label: "Full Name",
    //         type: ControlType.TextInput,
    //         validation: {
    //           required: true
    //         }
    //       } as TextInputOptions,
    //       {
    //         name: 'age',
    //         label: "Age",
    //         type: ControlType.NumericInput,
    //         validation: {
    //           max: 55,
    //           min: 18
    //         }
    //       } as NumericInputOptions,          
    //       {
    //         name: 'city',
    //         label: "City",
    //         type: ControlType.TextInput,
    //         hint: 'Enter the city name'
    //       } as TextInputOptions,
    //       {
    //         name: 'registered',
    //         label: 'Voter Registration',
    //         text: "Registered voter",            
    //         type: ControlType.ToogleButton
    //       } as ToggleOptions,
    //       {
    //         name: 'affiliation',
    //         label: "Party Affiliation",            
    //         type: ControlType.RadioGroup,
    //         items: [
    //           { value: 1, text: 'Democratic' },
    //           { value: 2, text: 'Republican' },
    //           { value: 3, text: 'Independent' }
    //         ],
    //         expressions: {
    //           disabled: '!${registered};'
    //         }
    //       } as RadioGroupOptions,   
    //       {
    //         name: 'countries',
    //         label: "Countries Visited Past 6 Months",            
    //         type: ControlType.MultiSelect,
    //         items: [
    //           { value: 1, text: 'Brazil' },
    //           { value: 2, text: 'Colombia' },
    //           { value: 3, text: 'USA' },
    //           { value: 4, text: 'Spain' },
    //         ],
    //         expressions: {
    //           disabled: '!${registered};'
    //         }            
    //       } as RadioGroupOptions,                         
    //     ] 
    //   },      
    //   {
    //     controls: [
    //       {
    //         name: 'comments',
    //         label: "Comments",
    //         type: ControlType.TextArea
    //       } as TextAreaOptions,
    //       {
    //         name: 'terms',
    //         type: ControlType.TextBlock,
    //         label: 'Terms and Conditions',
    //         text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus scelerisque eros ut lacus porta, ut fringilla velit vulputate. Vestibulum eu purus quis velit cursus iaculis. Etiam metus enim, varius et semper sit amet, posuere eu urna. Aliquam ac neque arcu. Nunc aliquam purus quis nisi elementum, eget dignissim velit egestas. Nulla bibendum libero ante, a egestas neque blandit eu. Praesent at tincidunt neque, id dignissim nisi.<br/><br/>Etiam posuere risus ut ex pulvinar convallis. Etiam id blandit est, ut convallis ligula. Proin feugiat ultrices ex ut ullamcorper. Fusce accumsan, mi fringilla condimentum tincidunt, turpis enim fringilla mauris, a maximus magna purus nec libero. Morbi molestie ornare pellentesque. In sed iaculis arcu. Nam id nisi porttitor, ornare turpis euismod, venenatis mauris. Nulla facilisi.',
    //       } as TextBlockOptions,
    //       {
    //         name: 'agree',
    //         type: ControlType.ToogleButton,
    //         text: 'I Agree to the terms and conditions.',
    //         toggleMode: ToggleMode.SlideToggle,
    //         validation: {
    //           requiredTrue: true
    //         },
    //         validationMessages: {
    //           required: 'You must agree to the terms and conditions'
    //         }
    //       } as ToggleOptions
    //     ] 
    //   },            
    // ];

    // sampleData = {
    //   fullname: 'John Doe',
    //   affiliation: 3,
    //   registered: true,
    //   agree: true,
    //   countries: [2,4]
    // }

    this.data = this.service.create(config, sampleData);
    console.log(this.data);

    this.data.form.valueChanges.subscribe(v => console.log('form', v));

  }

  submit(e: DynamicFormInternals): void {
    console.log('submitted');
    console.log(e);
    console.log(e.value());
  }

}
