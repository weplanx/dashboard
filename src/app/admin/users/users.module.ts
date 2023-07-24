import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { UsersComponent } from './users.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [UsersComponent]
})
export class UsersModule {}