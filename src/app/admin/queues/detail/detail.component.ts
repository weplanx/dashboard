import { Component, Input, OnInit } from '@angular/core';

import { Queue } from '@common/models/queue';
import { QueuesService } from '@common/services/queues.service';
import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-queues-detail',
  templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {
  @Input({ required: true }) doc!: AnyDto<Queue>;

  constructor(
    private message: NzMessageService,
    private queues: QueuesService
  ) {}

  ngOnInit(): void {
    this.queues.info(this.doc._id).subscribe(data => {
      console.log(data);
    });
  }

  sync(): void {
    this.queues.sync(this.doc._id).subscribe(() => {
      this.message.success(`队列配置已同步`);
    });
  }
}
