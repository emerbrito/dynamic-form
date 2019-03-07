import { Directive, ElementRef, HostListener, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[ebNumbersOnly]'
})
export class NumbersOnlyDirective implements OnInit {

  private _separator: string;

  @Input() decimals: number;
  
  get decimalSeparator(): string {
    return this._separator || '.';
  }

  @Input()
  set decimalSeparator(value: string) {
    this._separator = value;
  }


  get useDecimals(): boolean {
    return this.decimals && this.decimals > 0;
  }

  constructor(private el: ElementRef) 
  { 
  }

  ngOnInit() {
  }

  @HostListener('keydown', [ '$event' ])
  keyDown(event: KeyboardEvent) {
    
    let index: number;
    let decimalIndex: number;
    let decimalBlock: string;

    if(!event.key) {
      return;      
    }

    // key value contains more than one character, 
    // it must be a pre-defined key value:
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
    // we are looking for values of only one digit.
    if(event.key.length > 1) {
      return;
    }
    
    // if using decimals ensure it is only entered once
    if(this.useDecimals) {

      if(event.key === this.decimalSeparator) {

        if(this.getValue().split(this.decimalSeparator).length > 1) {
          event.preventDefault();
          return;
        }
        else {
          return;
        }
      }
    }

    // at this point abort if it is not a numeric key.
    if(isNaN(event.key as any)) {
      event.preventDefault();
      return;      
    }     


    // if we have the character's index we use it to determine
    // whether or not it is being added as a decimal so we can provide a better user experience where
    // we don't remove the characther after it has been added (on keyup).
    // if index is not available then it will be cleand-up on keyup.
    if(this.useDecimals) {

      if(event.srcElement && event.srcElement['selectionStart'] != null) {
      
        index = event.srcElement['selectionStart'] as number;
        decimalIndex = (this.getValue() || '').indexOf(this.decimalSeparator);


        if(decimalIndex >= 0 && index > decimalIndex) {

          decimalBlock = (this.getValue() || '').substring(decimalIndex + 1);          

          if(decimalBlock.length >= this.decimals) {
            event.preventDefault();
            return;
          }
        }
      } 
    }
   
  }

  @HostListener('keyup', [ '$event' ])
  keyUp(event: KeyboardEvent) {

    let result = < { valid: boolean }>{};

    if(!event.key) {
      return;      
    }

    // fail safe. clean it up if not able to prevent characters from being entered.
    this.setValue(this.format(this.getValue(), result));
  }
  
  @HostListener('blur', [ '$event' ])
  blur(event: FocusEvent) {
    
    // clean it up on blur, necessary
    // to handle numbers pasted into the field.

    let formattedValue: string;
    let value: string = this.getValue();

    if(value) {    
      formattedValue = this.format(value);      
      this.setValue(formattedValue);
    }
  } 

  private format(value: string, result?: { valid: boolean }): string {

    if(!value) {
      return value;
    }

    let length: number = value ? value.length : 0;
    let separator: string = this.useDecimals ? this.decimalSeparator : '';
    let cleanupPattern: string = `[^0-9${separator}]`;
    let cleanupExp: RegExp = new RegExp(cleanupPattern);
    let decimals: string;
    let decimalsPattern: string;
    let decimalsExp: RegExp;
    let matches: RegExpMatchArray;

    value = value.replace(cleanupExp, '');

    if(this.useDecimals) {
      decimals = this.decimals && this.decimals > 0 ? `{0,${this.decimals}}` : '*';
      decimalsPattern = `^(\\d*\\.?\\d${decimals})`;
      decimalsExp = new RegExp(decimalsPattern);
      matches = value.match(decimalsExp);      
      if(matches && matches.length > 0) {
        value = matches[0]
      }
    }

    if(result) {
      result.valid = value.length === length;
    }

    return value;
  }

  private getValue(): string {

    return  this.el.nativeElement.value.toString();
  }

  private setValue(value: string): void {
    this.el.nativeElement.value = value
  }

}


