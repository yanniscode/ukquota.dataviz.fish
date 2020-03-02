import { Directive, forwardRef, Injectable } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn,AsyncValidator, NG_ASYNC_VALIDATORS } from '@angular/forms';


/* un login ne doit pas être différent de celui souhaité (ex: admin: yatest) */
export const loginUnCheckedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

/** EXEMPLE : A hero's name can't match the hero's alter ego */
// export const identityRevealedValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {

  const login = control.get('login');
  console.log(login);

  const mail = control.get('mail');
  console.log(mail);

  // const loginValue = this.userForm.get('login').value;
  // console.log(loginValue);

  const loginCheck = ""; // votre login (admin)
  const mailCheck = ""; // votre mail (admin)

  return login.value !== loginCheck && mail.value !== mailCheck ? { 'loginUnchecked': true } : null;

  // return login && loginCheck && login === login.value ? { 'loginChecked': true } : null;
  // return name && alterEgo && name.value === alterEgo.value ? { 'identityRevealed': true } : null;
  
  };

  @Directive({
      selector: '[appLoginChecked]',
      // selector: '[appIdentityRevealed]',
      providers: [{ provide: NG_VALIDATORS, useExisting: LoginCheckedValidatorDirective, multi: true }]
  //   providers: [{ provide: NG_VALIDATORS, useExisting: IdentityRevealedValidatorDirective, multi: true }]
  })

  @Injectable({ providedIn: 'root' })


export class LoginCheckedValidatorDirective implements Validator {
// export class IdentityRevealedValidatorDirective implements Validator {
  
  validate(control: AbstractControl): ValidationErrors {

    return loginUnCheckedValidator(control);
    // return identityRevealedValidator(control)

  }

}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
