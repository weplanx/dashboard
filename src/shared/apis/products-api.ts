import { Injectable } from '@angular/core';

import { Product } from '@shared/models';

import { Api } from './index';

@Injectable({
  providedIn: 'root'
})
export class ProductsApi extends Api<Product> {
  override collection = 'products';
}
