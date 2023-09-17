import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { ExploreContainerComponentModule } from 'src/app/components/explore-container/explore-container.module';
import { HeadshotPage } from '../../headshot/headshot.page';
import { HeadshotPageModule } from '../../headshot/headshot.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    ComponentsModule,
    HeadshotPageModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
