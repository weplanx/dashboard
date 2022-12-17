import { Component, OnInit, ViewChild } from '@angular/core';

import { Role } from '@orgs/roles/types';
import { AnyDto, WpxData, WpxService } from '@weplanx/ng';
import { TableField, WpxTableComponent } from '@weplanx/ng/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { FormComponent } from './form/form.component';
import { ProjectsService } from './projects.service';
import { Project } from './types';

@Component({
  selector: 'app-admin-projects',
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  /**
   * 搜索
   */
  searchText = '';
  /**
   * 数据
   */
  data: WpxData<AnyDto<Project>> = new WpxData<AnyDto<Project>>();

  constructor(
    public projects: ProjectsService,
    private wpx: WpxService,
    private modal: NzModalService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getData(true);
  }

  getData(refresh = false): void {
    this.projects.pages(this.data, refresh).subscribe(() => {});
  }

  /**
   * 搜索
   */
  search(): void {
    if (!this.searchText) {
      this.data.filter = {};
    } else {
      this.data.filter = { name: { $regex: this.searchText } };
    }
    this.getData(true);
  }

  /**
   * 编辑表单
   * @param doc
   */
  form(doc?: AnyDto<Project>): void {
    this.modal.create({
      nzTitle: !doc ? '新增' : '编辑',
      nzContent: FormComponent,
      nzComponentParams: {
        doc
      },
      nzOnOk: () => {}
    });
  }

  /**
   * 删除
   * @param doc
   */
  delete(doc: AnyDto<Project>): void {
    this.modal.confirm({
      nzTitle: '您确定要删除该项目吗?',
      nzOkText: '是的',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.projects.delete(doc._id).subscribe(() => {
          this.message.success('数据删除完成');
        });
      },
      nzCancelText: '再想想'
    });
  }
}
