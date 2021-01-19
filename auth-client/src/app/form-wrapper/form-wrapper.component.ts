import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.scss'],
})
export class FormWrapperComponent implements OnInit {
  @Input() formTitle: string | undefined;
  title: string | undefined = 'Welcome to BMS';
  constructor() {
    return;
  }

  ngOnInit(): void {
    return;
  }
}
