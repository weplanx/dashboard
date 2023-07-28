import { computed, signal } from '@angular/core';
import { map, Observable } from 'rxjs';

import { NzDrawerRef } from 'ng-zorro-antd/drawer';

import { WpxApi } from './api';
import { Any, AnyDto, Filter, FindResult, WpxModelStore, XFilter } from '../types';
import { WpxStoreService } from '../wpx-store.service';

export class WpxModel<T> {
  data = signal<AnyDto<T>[]>([]);
  dataFilter = computed(() => this.data().filter(v => !v['disabled']));
  loading = signal<boolean>(false);
  total = 0;
  page = 1;
  pagesize = 20;
  private xfilter: XFilter = {};

  advanced = signal<NzDrawerRef | null>(null);
  searchText = '';
  keywords: Any[] = [];

  checked = false;
  indeterminate = false;
  selection = new Map<string, T>();

  constructor(
    public key: string,
    private store: WpxStoreService,
    private api: WpxApi<T>
  ) {}

  ready(xfilter?: XFilter): Observable<WpxModelStore<AnyDto<T>>> {
    if (xfilter) {
      this.xfilter = xfilter;
    }
    return this.store.get(this.key).pipe(
      map(unkown => {
        const data = unkown as WpxModelStore<AnyDto<T>>;
        this.searchText = data?.searchText ?? '';
        this.keywords = data?.keywords ?? [];
        this.page = data?.page ?? 1;
        this.pagesize = data?.pagesize ?? 20;
        return {
          searchText: this.searchText,
          keywords: this.keywords,
          page: this.page,
          pagesize: this.pagesize
        };
      })
    );
  }

  fetch(search?: Filter<T>): Observable<FindResult<T>> {
    const filter: Filter<T> = {};
    this.loading.set(true);

    if (!this.advanced() && this.keywords.length !== 0) {
      filter.$or = this.keywords;
    }

    return this.api
      .find({ ...filter, ...search }, { page: this.page, pagesize: this.pagesize, xfilter: this.xfilter })
      .pipe(
        map(result => {
          this.data.set(result.data);
          this.total = result.total;
          this.updateStatus();
          this.updateSelectionStatus();
          this.loading.set(false);
          return result;
        })
      );
  }

  setSelection(data: AnyDto<T>): void {
    this.selection.set(data._id, data);
    this.updateSelectionStatus();
  }

  removeSelection(id: string): void {
    this.selection.delete(id);
    this.updateSelectionStatus();
  }

  setCurrentSelections(checked: boolean): void {
    this.dataFilter().forEach(v => (checked ? this.setSelection(v) : this.removeSelection(v._id)));
    this.updateSelectionStatus();
  }

  private updateSelectionStatus(): void {
    const data = this.dataFilter();
    this.checked = data.every(v => this.selection.has(v._id));
    this.indeterminate = !this.checked ? data.some(v => this.selection.has(v._id)) : false;
  }

  private updateStatus(): void {
    this.store.set(this.key, {
      searchText: this.searchText,
      keywords: this.keywords,
      page: this.page,
      pagesize: this.pagesize
    });
  }
}
