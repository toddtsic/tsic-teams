import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { Tab5Page } from './tab5.page';
import { Tab5PageRoutingModule } from './tab5-routing.module';
import { NewTeamPushComponent } from '../../new-team-push/new-team-push.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    Tab5PageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    Tab5Page,
    NewTeamPushComponent,
  ]
})
export class Tab5PageModule {}
