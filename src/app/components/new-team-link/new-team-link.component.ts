import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-team-link',
  templateUrl: './new-team-link.component.html',
  styleUrls: ['./new-team-link.component.scss'],
})
export class NewTeamLinkComponent implements OnInit {
  @Input() roleName: string;

  newLabel: string = '';
  newUrl: string = '';

  form: FormGroup = this.fb.group({
    linkText: ['', Validators.required],
    linkUrl: ['', Validators.required],
    bAllJobTeams: [false]
  });

  formValidators = {
    'linkText': [
      { type: 'required', message: 'LINK TEXT is required.' },
    ],
    'linkUrl': [
      { type: 'required', message: 'LINKURL is required.' },
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

  addLink() {
    if (this.form.valid){
      this.modalCtrl.dismiss(
        {
          linkText: this.form.get('linkText')?.value,
          linkUrl: this.form.get('linkUrl')?.value,
          bAllJobTeams: this.form.get('bAllJobTeams')?.value
        }
      );
    }
  }
}
