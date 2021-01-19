import { Component, OnInit, ViewChild } from '@angular/core';
import { AeDynamicFormComponent, AeFormBuilder } from 'ae-dynamic-form';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  @ViewChild('loginForm')
  public loginForm: AeDynamicFormComponent | undefined;

  form = new AeFormBuilder()
    .title('Login Form')

    .newControl('email')
    .required()
    .email()
    .type('email')
    .icon('person', 'accent')
    .placeholder('Username')
    .label('User Name')
    .autocomplete('username')
    .buildFormControl()

    .newControl('password')
    .type('password')
    .required()
    .minLength(8)
    .icon('security', 'accent')
    .placeholder('Password')
    .label('Password')
    .autocomplete('current-password')
    .buildFormControl()

    .newControl('remember')
    .optional()
    .state('')
    .type('checkbox')
    .label('Remember me')

    .buildFormControl()

    .submitButtonLabel('Login')
    .buildForm();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    return;
  }

  async submit(event: any): Promise<any> {
    try {
      await this.authService.login(event).toPromise();
    } catch (err) {
      this.loginForm?.reset();
    } finally {
      this.loginForm?.reset();
    }
  }
}
