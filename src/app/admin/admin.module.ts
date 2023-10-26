import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NavModule } from '@common/components/nav/nav.module';
import { ShareModule } from '@common/share.module';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
        data: {
          breadcrumb: `项目`
        }
      },
      {
        path: 'clusters',
        loadChildren: () => import('./clusters/clusters.module').then(m => m.ClustersModule),
        data: {
          breadcrumb: `集群`
        }
      },
      {
        path: 'endpoints',
        loadChildren: () => import('./endpoints/entpoints.module').then(m => m.EntpointsModule),
        data: {
          breadcrumb: `服务端点`
        }
      },
      {
        path: 'imessages',
        loadChildren: () => import('./imessages/imessages.module').then(m => m.ImessagesModule),
        data: {
          breadcrumb: `即时通信`
        }
      },
      {
        path: 'acc-tasks',
        loadChildren: () => import('./acc-tasks/acc-tasks.module').then(m => m.AccTasksModule),
        data: {
          breadcrumb: `资源加速`
        }
      },
      {
        path: 'datasets',
        loadChildren: () => import('./datasets/datasets.module').then(m => m.DatasetsModule),
        data: {
          breadcrumb: `数据集合`
        }
      },
      {
        path: 'monitor',
        loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule),
        data: {
          breadcrumb: `服务监控`
        }
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        data: {
          breadcrumb: `团队成员`
        }
      },
      {
        path: 'integrated',
        loadChildren: () => import('./integrated/integrated.module').then(m => m.IntegratedModule),
        data: {
          breadcrumb: `集成服务`
        }
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule),
        data: {
          breadcrumb: `设置`
        }
      },
      { path: '', redirectTo: 'projects', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, NavModule, RouterModule.forChild(routes)],
  declarations: [AdminComponent]
})
export class AdminModule {}
