import { Routes } from '@angular/router';

import { appGuard } from './app.guard';
import { appResolver } from './app.resolver';
import { Login } from './login/login';

export const routes: Routes = [
  {
    path: 'login',
    component: Login
  },
  {
    path: '',
    canActivate: [appGuard],
    resolve: {
      layout: appResolver
    },
    children: [
      {
        path: 'index',
        data: {
          breadcrumb: '工作站'
        },
        loadComponent: () => import('./index/index').then(m => m.Index),
        loadChildren: () => import('./index/children.routes').then(m => m.childrenRoutes)
      },
      {
        path: 'system',
        data: {
          breadcrumb: '系统设置'
        },
        loadComponent: () => import('./system/system').then(m => m.Settings),
        loadChildren: () => import('./system/children.routes').then(m => m.childrenRoutes)
      },
      { path: '', redirectTo: '/index', pathMatch: 'full' }
    ]
  }
];
