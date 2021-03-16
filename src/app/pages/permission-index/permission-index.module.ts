import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppExtModule } from '@ext';
import { PermissionIndexComponent, PermissionModule } from 'van-skeleton/permission';

const routes: Routes = [
  {
    path: '',
    component: PermissionIndexComponent
  }
];

@NgModule({
  imports: [
    PermissionModule,
    AppExtModule,
    RouterModule.forChild(routes)
  ]
})
export class PermissionIndexModule {
}