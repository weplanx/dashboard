import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Area } from '@antv/g2plot';

import { MonitorService } from '../../monitor.service';

@Component({
  selector: 'app-admin-monitor-db-flushes',
  template: `
    <nz-card nzTitle="Flushes">
      <div #ref></div>
    </nz-card>
  `
})
export class FlushesComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() interval = 5;

  @ViewChild('ref') ref!: ElementRef;
  private plot?: Area;
  private subscription!: Subscription;

  constructor(private monitor: MonitorService) {}

  ngOnInit(): void {
    this.subscription = this.monitor.interval
      .pipe(
        switchMap(v => timer(0, v * 1000)),
        switchMap(() => this.monitor.getMongoFlushes())
      )
      .subscribe(data => {
        if (this.plot) {
          this.plot.changeData(data.map(v => ({ time: v[0], value: v[1] })));
        }
      });
  }

  ngAfterViewInit(): void {
    this.plot = new Area(this.ref.nativeElement, {
      height: 200,
      data: [],
      xField: 'time',
      yField: 'value'
    });
    this.plot.render();
  }

  ngOnDestroy(): void {
    this.plot?.destroy();
    this.subscription.unsubscribe();
  }
}
