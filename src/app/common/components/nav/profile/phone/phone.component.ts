import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { Any } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-nav-profile-phone',
  templateUrl: './phone.component.html'
})
export class PhoneComponent implements OnInit {
  form!: FormGroup;
  tips = {
    phone: {
      default: {
        required: `手机号码不能为空`,
        pattern: '手机号码格式不规范'
      }
    },
    code: {
      default: {
        required: `验证码不能为空`,
        pattern: '验证码格式不规范'
      }
    }
  };
  timer = 0;
  private timeId?: Any;

  constructor(
    private app: AppService,
    private modalRef: NzModalRef,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      area: ['+86', [Validators.required]],
      phone: [null, [Validators.required, Validators.pattern(/[0-9]{11}/)]],
      code: [null, [Validators.required, Validators.pattern(/[0-9]{6}/)]]
    });
  }

  getCode(): void {
    const phone = this.form.get('area')!.value + this.form.get('phone')!.value;
    this.timer = 60;
    this.app.getUserPhoneCode(phone).subscribe(() => {
      this.timeId = setInterval(() => {
        if (!this.timer) {
          clearInterval(this.timeId);
          return;
        }
        this.timer--;
      }, 1000);
    });
  }

  close(): void {
    if (this.timeId) {
      clearInterval(this.timeId);
    }
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.app.setUserPhone(data.area + data.phone, data.code).subscribe(() => {
      this.message.success($localize`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}