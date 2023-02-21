import { Component } from '@angular/core';

@Component({
  selector: 'exp-root',
  template: `
    <nz-layout class="common-layout" style="padding-left: 0">
      <nz-sider nzTheme="light">
        <ul nz-menu nzMode="inline">
          <li nz-menu-group nzTitle="插件">
            <ul>
              <li nz-menu-item nzMatchRouter [routerLink]="['/experiment', 'plugins', 'richtext']">块编辑器</li>
              <li nz-menu-item nzMatchRouter [routerLink]="['/experiment', 'plugins', 'store']">本地存储</li>
              <li nz-menu-item nzMatchRouter [routerLink]="['/experiment', 'plugins', 'table']">动态表格</li>
            </ul>
          </li>
          <li nz-menu-group nzTitle="引擎">
            <ul>
              <li nz-menu-item nzMatchRouter [routerLink]="['/experiment', 'blocks', 'grid']">栅格</li>
              <li nz-menu-item nzMatchRouter [routerLink]="['/experiment', 'blocks', 'card']">卡片</li>
            </ul>
          </li>
        </ul>
      </nz-sider>
      <nz-layout>
        <nz-content style="padding: 8px">
          <router-outlet></router-outlet>
        </nz-content>
      </nz-layout>
    </nz-layout>
  `
})
export class ExperimentComponent {}
