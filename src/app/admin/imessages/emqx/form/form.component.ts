import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Any, R, WpxService } from '@weplanx/ng';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-admin-imessage-emqx-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  tips = {
    EmqxHost: {
      default: {
        required: $localize`EMQX Host 不能为空`
      }
    },
    EmqxApiKey: {
      default: {
        required: $localize`Emqx ApiKey 不能为空`
      }
    },
    EmqxSecretKey: {
      default: {
        required: $localize`Emqx SecretKey 不能为空`
      }
    }
  };

  constructor(
    @Inject(NZ_MODAL_DATA)
    public data: R,
    private wpx: WpxService,
    private modalRef: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      EmqxHost: [null, [Validators.required]],
      EmqxApiKey: [null, [Validators.required]],
      EmqxSecretKey: [null, [Validators.required]]
    });
    this.form.patchValue({
      EmqxHost: this.data['EmqxHost'],
      EmqxApiKey: this.data['EmqxApiKey']
    });
  }

  close(): void {
    this.modalRef.triggerCancel();
  }

  submit(data: Any): void {
    this.wpx.setValues(data).subscribe(() => {
      this.message.success($localize`数据更新成功`);
      this.modalRef.triggerOk();
    });
  }
}
