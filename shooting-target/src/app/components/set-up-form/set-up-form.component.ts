import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-set-up-form',
  templateUrl: './set-up-form.component.html',
  styleUrls: ['./set-up-form.component.css']
})
export class SetUpFormComponent implements OnInit {

  setUpForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

    this.setUpForm = this.fb.group({
      name: '',
      range: '',
      discipline: ''
    })
    this.setUpForm.valueChanges.subscribe(console.log)
  }
}
