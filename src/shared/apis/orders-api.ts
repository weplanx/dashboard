import { Injectable } from '@angular/core';

import { Order } from '@shared/models';

import { Api } from './index';

@Injectable({
  providedIn: 'root'
})
export class OrdersApi extends Api<Order> {
  override collection = 'orders';
}
