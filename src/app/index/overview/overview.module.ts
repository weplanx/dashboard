import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ClusterComponent } from './cluster/cluster.component';
import { EntryComponent } from './entry/entry.component';
import { OverviewComponent } from './overview.component';

const routes: Routes = [
  {
    path: '',
    component: OverviewComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [OverviewComponent, ClusterComponent, EntryComponent]
})
export class OverviewModule {}
