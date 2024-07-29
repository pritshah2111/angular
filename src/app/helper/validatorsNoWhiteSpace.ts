import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function onlyWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (
      (control.value && control.value.trim().length === 0) ||
      control.value !== control.value.trim()
    ) {
      return { onlyWhitespace: true };
    } else {
      return null;
    }
  };
}
