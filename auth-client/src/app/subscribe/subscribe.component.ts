import { Component, OnInit, ViewChild } from '@angular/core';
import { AeDynamicFormComponent, AeFormBuilder } from 'ae-dynamic-form';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
})
export class SubscribeComponent implements OnInit {
  @ViewChild('loginForm')
  public loginForm: AeDynamicFormComponent | undefined;

  form = new AeFormBuilder()
    .title('Subscription')

    .newControl('person')
    .type('text')
    .required()
    .icon('person', 'accent')
    .placeholder('First Name')
    .autocomplete('name')
    .buildFormControl()

    .newControl('lastName')
    .type('text')
    .required()
    .icon('person', 'accent')
    .placeholder('Last Name')
    .autocomplete('family-name')
    .buildFormControl()

    .newControl('organization')
    .type('text')
    .required()
    .icon('apartment', 'accent')
    .placeholder('Organization')
    .buildFormControl()

    .newControl('email')
    .required()
    .email()
    .type('email')
    .icon('person', 'accent')
    .placeholder('Email')
    .label('Email')
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
    .confirmation()
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
