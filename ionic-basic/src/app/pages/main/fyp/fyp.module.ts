import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FypPageRoutingModule } from './fyp-routing.module';

import { FypPage } from './fyp.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FypPageRoutingModule,
    SharedModule
  ],
  declarations: [FypPage]
})
export class FypPageModule {}
