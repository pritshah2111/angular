import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Patterns } from './helper';
import { isValidPhoneNumber } from 'libphonenumber-js';

export function checkPasswordValidation(
  control: AbstractControl,
): ValidationErrors | null {
  if (!control.value?.match(Patterns.strong_password)) {
    return { strong_password: true };
  }
  return null;
}

export function ConfirmPasswordValidator(
  controlName: string,
  matchingControlName: string,
) {
  return (formGroup: FormGroup) => {
    let control = formGroup.controls[controlName];
    let matchingControl = formGroup.controls[matchingControlName];

    // Check if controls exist
    if (!control || !matchingControl) {
      return;
    }

    if (
      matchingControl.errors &&
      !matchingControl.errors['confirmPasswordValidator']
    ) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPassword: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

// cannot Contain Space
export function cannotContainSpace(
  control: AbstractControl,
): ValidationErrors | null {
  if (control.value?.startsWith(' ') || control.value?.endsWith(' ')) {
    return { whiteSpace: true };
  }
  return null;
}

export function validPhoneNumber(
  control: AbstractControl,
): ValidationErrors | null {
  try {
    const isValid = isValidPhoneNumber(control.value);
    return isValid ? null : { validatePhoneNumber: 'invalid' };
  } catch (error) {
    return { validatePhoneNumber: 'invalid' };
  }
}
