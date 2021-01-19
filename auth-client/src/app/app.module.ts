import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { AeDynamicFormModule } from 'ae-dynamic-form';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { FormWrapperComponent } from './form-wrapper/form-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    SubscribeComponent,
    LoginComponent,
    UsersComponent,
    HomeComponent,
    FormWrapperComponent,
  ],
  imports: [
    BrowserModule,
    AeDynamicFormModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
