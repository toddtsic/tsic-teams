import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-team-push',
  templateUrl: './new-team-push.component.html',
  styleUrls: ['./new-team-push.component.scss'],
})
export class NewTeamPushComponent implements OnInit {
  @Input() roleName: string;

  newLabel: string = '';
  newUrl: string = '';

  form: FormGroup = this.fb.group({
    pushText: ['', Validators.required],
    bAllJobTeams: [false]
  });

  formValidators = {
    'pushText': [
      { type: 'required', message: 'PUSH TEXT is required.' },
    ]
  };

  constructor(
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form.valueChanges
      .pipe(
        
      )
      .subscribe();
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  addPush() {
    if (this.form.valid){
      this.modalCtrl.dismiss(
        {
          pushText: this.form.get('pushText')?.value,
          bAllJobTeams: this.form.get('bAllJobTeams')?.value
        }
      );
    }
  }
}
