import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';

import { AppService } from '@app';
import { Project } from '@common/models/project';
import { ProjectsService } from '@common/services/projects.service';
import { Any, AnyDto } from '@weplanx/ng';
import Joi from 'joi';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-index-overview-entry',
  templateUrl: './entry.component.html'
})
export class EntryComponent implements OnInit {
  data!: AnyDto<Project>;
  form!: FormGroup;

  private ipSchema = Joi.string().ip();

  constructor(
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder,
    private projects: ProjectsService,
    private app: AppService
  ) {}

  ngOnInit(): void {
    this.data = this.app.contextData!;
    this.form = this.fb.group({
      entry: this.fb.array([])
    });
    this.data.entry?.forEach(v => {
      this.append(v);
    });
  }

  get list(): FormArray {
    return this.form?.get('entry') as FormArray;
  }

  append(value?: string): void {
    this.list.push(this.fb.control(value, [this.checkIp]));
  }

  checkIp = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return { required: true };
    }
    if (this.ipSchema.validate(control.value).error) {
      return { error: true };
    }
    return {};
  };

  remove(index: number): void {
    this.list.removeAt(index);
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.projects.updateById(this.data._id, { $set: data }).subscribe(() => {
      this.message.success(`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}
