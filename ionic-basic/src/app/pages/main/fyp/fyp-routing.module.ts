import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FypPage } from './fyp.page';

const routes: Routes = [
  {
    path: '',
    component: FypPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FypPageRoutingModule {}
