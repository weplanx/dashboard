import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';
import { Queue } from '@common/models/queue';
import { QueuesService } from '@common/services/queues.service';
import { AnyDto, WpxModel, WpxService } from '@weplanx/ng';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { DetailComponent } from './detail/detail.component';
import { FormComponent, FormInput } from './form/form.component';
import { PublishComponent, PublishInput } from './publish/publish.component';

@Component({
  selector: 'app-admin-queues',
  templateUrl: './queues.component.html'
})
export class QueuesComponent implements OnInit {
  model!: WpxModel<Queue>;

  constructor(
    private app: AppService,
    private wpx: WpxService,
    private queues: QueuesService,
    private modal: NzModalService,
    private message: NzMessageService,
    private drawer: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.model = this.wpx.setModel('queues', this.queues);
    this.model.ready({ project: 'oid' }).subscribe(() => {
      this.getData();
    });
  }

  getData(refresh = false): void {
    if (refresh) {
      this.model.page = 1;
    }
    this.model
      .fetch({
        project: this.app.contextData!._id
      })
      .subscribe(() => {});
  }

  openForm(doc?: AnyDto<Queue>): void {
    this.modal.create<FormComponent, FormInput>({
      nzTitle: !doc ? '创建' : `编辑【${doc.name}】`,
      nzWidth: 640,
      nzContent: FormComponent,
      nzData: {
        doc
      },
      nzOnOk: () => {
        this.getData(true);
      }
    });
  }

  openDetail(doc: AnyDto<Queue>): void {
    this.drawer.create({
      nzClosable: false,
      nzContent: DetailComponent,
      nzContentParams: {
        doc
      },
      nzWidth: 960
    });
  }

  openPublish(): void {
    this.modal.create<PublishComponent, PublishInput>({
      nzTitle: '发布消息',
      nzContent: PublishComponent,
      nzWidth: 640
    });
  }

  delete(doc: AnyDto<Queue>): void {
    this.modal.confirm({
      nzTitle: `您确定要删除【${doc.name}】?`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.queues.delete(doc._id).subscribe(() => {
          this.message.success(`数据删除成功`);
          this.getData(true);
        });
      },
      nzCancelText: `再想想`
    });
  }

  bulkDelete(): void {
    this.modal.confirm({
      nzTitle: `您确定删除这些队列吗？`,
      nzOkText: `是的`,
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        this.queues
          .bulkDelete(
            {
              _id: { $in: [...this.model.selection.keys()] }
            },
            {
              xfilter: {
                '_id->$in': 'oids'
              }
            }
          )
          .subscribe(() => {
            this.message.success(`数据删除成功`);
            this.getData(true);
            this.model.setCurrentSelections(false);
          });
      },
      nzCancelText: `再想想`
    });
  }
}
