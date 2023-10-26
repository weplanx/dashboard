import { Component, OnInit } from '@angular/core';

import { AppService } from '@app';
import { Cluster, ClusterInfo } from '@common/models/cluster';
import { Project, TenantsResult } from '@common/models/project';
import { ClustersService } from '@common/services/clusters.service';
import { ProjectsService } from '@common/services/projects.service';
import { AnyDto } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ClusterComponent } from '../../admin/projects/cluster/cluster.component';

@Component({
  selector: 'app-index-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit {
  data!: AnyDto<Project>;
  tabIndex = 0;

  cluster?: AnyDto<Cluster>;
  clusterInfo?: ClusterInfo;
  tenants!: TenantsResult;

  constructor(
    public app: AppService,
    private modal: NzModalService,
    private clusters: ClustersService,
    private projects: ProjectsService,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.data = this.app.contextData!;
    console.log(this.data);
    this.getCluster();
    this.getTenants();
  }

  getTenants(): void {
    if (!this.data.cluster) {
      return;
    }
    this.projects.getTenants(this.data._id).subscribe(data => {
      this.tenants = data;
      this.message.loading(`正在获取租户信息`);
    });
  }

  getCluster(): void {
    if (this.data.cluster) {
      this.clusters.findById(this.data.cluster).subscribe(data => {
        this.cluster = data;
      });
      this.clusters.getInfo(this.data.cluster).subscribe(data => {
        this.clusterInfo = data;
      });
    }
  }

  openCluster(): void {
    this.modal.create<ClusterComponent, AnyDto<Project>>({
      nzTitle: `接入集群`,
      nzContent: ClusterComponent,
      nzOnOk: () => {
        this.app.fetchContextData().subscribe(() => {
          this.getCluster();
        });
      }
    });
  }

  deployNats(): void {
    this.projects.deployNats(this.data._id).subscribe(() => {
      this.message.success(`正在配置租户，请稍后刷新`);
    });
  }
}