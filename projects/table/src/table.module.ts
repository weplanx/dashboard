import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { WpxKeywordComponent } from './keyword.component';
import { WpxTableComponent } from './table.component';
import { WpxToolboxComponent } from './toolbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzCardModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzSpaceModule,
    NzToolTipModule,
    NzGridModule,
    NzDropDownModule,
    NzDrawerModule,
    NzMessageModule
  ],
  declarations: [WpxTableComponent, WpxKeywordComponent, WpxToolboxComponent],
  exports: [WpxTableComponent, WpxKeywordComponent, WpxToolboxComponent]
})
export class WpxTableModule {}