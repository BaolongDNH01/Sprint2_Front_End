import {FormGroup} from '@angular/forms';

// tslint:disable-next-line:typedef
export function ValidatePassword(passwordKey: string, confirmPasswordKey: string) {
  return (group: FormGroup): {[key: string]: any} => {
    const password = group.controls[passwordKey];
    const confirmPassword = group.controls[confirmPasswordKey];

    if (password.value !== confirmPassword.value) {
      return {
        mismatchedPasswords: true
      };
    }
  };
}

export function ValidateBirthDay() {

}
