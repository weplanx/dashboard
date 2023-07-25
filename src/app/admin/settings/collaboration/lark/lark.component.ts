import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '@app';
import { Any, R } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-settings-collaboration-lark',
  templateUrl: './lark.component.html'
})
export class LarkComponent implements OnInit {
  form!: FormGroup;
  tips = {
    LarkAppId: {
      default: {
        required: $localize`应用 ID 不能为空`
      }
    },
    LarkAppSecret: {
      default: {
        required: $localize`应用密钥不能为空`
      }
    },
    LarkEncryptKey: {
      default: {
        required: $localize`事件订阅安全校验数据密钥不能为空`
      }
    },
    LarkVerificationToken: {
      default: {
        required: $localize`事件订阅验证令牌不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA)
    public values: R,
    private app: AppService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      LarkAppId: [null, [Validators.required]],
      LarkAppSecret: [null, [Validators.required]],
      LarkEncryptKey: [null, [Validators.required]],
      LarkVerificationToken: [null, [Validators.required]]
    });
    this.form.patchValue({
      LarkAppId: this.values['LarkAppId']
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.app.setValues(data).subscribe(() => {
      this.message.success($localize`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}