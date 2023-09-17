import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab4PageRoutingModule } from './tab4-routing.module';

import { Tab4Page } from './tab4.page';
import { ExploreContainerComponentModule } from 'src/app/components/explore-container/explore-container.module';
import { AgendaService, DayService, MonthAgendaService, MonthService, ScheduleModule, TimelineViewsService, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab4PageRoutingModule,
    ExploreContainerComponentModule,
    ScheduleModule
  ],
  providers: [
    DayService, WeekService, MonthService, AgendaService, MonthAgendaService, TimelineViewsService   
  ],
  declarations: [Tab4Page]
})
export class Tab4PageModule {}
