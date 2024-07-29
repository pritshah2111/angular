import { Directive, HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appWhiteSpaceRestriction]',
})
export class InputWhiteSpaceRestrictionDirective {
  regexStr = '^[a-zA-Z0-9!@#$%^&*(),.<>?+-=;:\\|_ ]*$';
  // regexStr = "^[a-zA-Z0-9_ ]*$";

  constructor(private el: ElementRef) {}

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.el.nativeElement.selectionStart === 0 && event.key === ' ') {
      event.preventDefault();
    }

    // if (!RegExp(this.regexStr).test(event.key)) {
    //   event.preventDefault();
    // }
  }
}
