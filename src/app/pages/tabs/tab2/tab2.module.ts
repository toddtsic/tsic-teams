import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { ExploreContainerComponentModule } from 'src/app/components/explore-container/explore-container.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { NewTeamLinkComponent } from 'src/app/components/new-team-link/new-team-link.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    ComponentsModule
  ],
  declarations: [Tab2Page, NewTeamLinkComponent]
})
export class Tab2PageModule {}
