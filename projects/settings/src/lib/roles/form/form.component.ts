import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { AnyDto, Value } from '@weplanx/common';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

import { RolesService } from '../roles.service';
import { Role } from '../types';
import { LabelComponent } from './label/label.component';

@Component({
  selector: 'wpx-settings-roles-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  @Input() editable?: AnyDto<Role>;
  form?: FormGroup;

  constructor(
    private modalRef: NzModalRef,
    private modal: NzModalService,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private fb: FormBuilder,
    private roles: RolesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      key: [null, [Validators.required, Validators.pattern(/^[a-z_]+$/)], [this.existsKey]],
      description: [],
      labels: this.fb.array([]),
      status: [true, [Validators.required]]
    });
    if (this.editable) {
      this.editable.labels.forEach(() => {
        this.addLabel();
      });
      this.form.patchValue(this.editable);
    }
  }

  existsKey = (control: AbstractControl): Observable<any> => {
    if (control.value === this.editable?.key) {
      return of(null);
    }
    return this.roles.hasKey(control.value);
  };

  get labels(): FormArray {
    return this.form?.get('labels') as FormArray;
  }

  addLabel(value?: Value): void {
    this.labels.push(
      this.fb.group({
        label: [value?.label, [Validators.required]],
        value: [value?.value, [Validators.required, Validators.pattern(/^[a-z_]+$/)]]
      })
    );
  }

  removeLabel(index: number): void {
    this.labels.removeAt(index);
  }

  importLabels(): void {
    this.modal.create({
      nzTitle: '设置导入的标签',
      nzContent: LabelComponent,
      nzComponentParams: {
        exists: (this.labels.value as Value[]).map(v => v.value)
      },
      nzOnOk: instance => {
        for (const x of instance.items) {
          if (x.direction === 'right') {
            this.addLabel({
              label: x.title,
              value: x['value']
            });
          }
        }
      }
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: any): void {
    if (!this.editable) {
      this.roles.create({ doc: data }).subscribe(() => {
        this.message.success('数据新增完成');
        this.modalRef.triggerOk();
      });
    } else {
      this.roles.updateOneById(this.editable._id, { update: { $set: data } }).subscribe(() => {
        this.message.success('数据更新完成');
        this.modalRef.triggerOk();
      });
    }
  }
}
