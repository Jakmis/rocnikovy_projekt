import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

interface Discipline{
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-set-up-form',
  templateUrl: './set-up-form.component.html',
  styleUrls: ['./set-up-form.component.css']
})
export class SetUpFormComponent implements OnInit {
  setUpForm: FormGroup;
  disciplinesTenMeters: Discipline[] = [
    {value: '30', viewValue: 'VzPu30'},
    {value: '40', viewValue: 'VzPu40'},
    {value: '60', viewValue: 'VzPu60'},
  ]

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.setUpForm = this.fb.group({
      name: '',
      range: '',
      disciplines: this.disciplinesTenMeters
    })
    this.setUpForm.valueChanges.subscribe(console.log)
  }
}
