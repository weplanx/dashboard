import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ClustersComponent } from './clusters.component';

const routes: Routes = [
  {
    path: '',
    component: ClustersComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ClustersComponent]
})
export class ClustersModule {}