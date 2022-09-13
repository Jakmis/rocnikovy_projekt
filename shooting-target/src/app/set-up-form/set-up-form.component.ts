import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-set-up-form',
  templateUrl: './set-up-form.component.html',
  styleUrls: ['./set-up-form.component.css']
})
export class SetUpFormComponent implements OnInit {

  form = this.formBuilder.group({
    name: '',
    email: '',
  });

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  onSubmit(): void {
    console.warn(('Success'));
  }

  ngOnInit(): void {
  }

}
