import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { WpxPageNode } from '../types';
import { WpxLayoutService } from '../wpx-layout.service';

@Component({
  selector: 'wpx-page-header',
  templateUrl: './wpx-page-header.component.html'
})
export class WpxPageHeaderComponent implements OnInit {
  dict?: Record<string, WpxPageNode>;

  constructor(public wpxLayout: WpxLayoutService) {}

  ngOnInit(): void {
    this.wpxLayout.pages.subscribe(result => {
      if (!!result.dict) {
        this.dict = result.dict;
      }
    });
  }
}