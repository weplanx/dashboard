import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { WpxService } from '../wpx.service';

@Component({
  selector: 'wpx-page-header',
  templateUrl: './page-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WpxPageHeaderComponent {
  @Input() wpxManual = false;

  constructor(public wpx: WpxService) {}
}