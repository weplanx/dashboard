import { Component, Type } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';

import { AppService } from '@app';
import { TotpComponent } from '@common/components/nav/profile/totp/totp.component';
import { ShareModule } from '@common/share.module';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { AvatarComponent } from './avatar/avatar.component';
import { EmailComponent } from './email/email.component';
import { NameComponent } from './name/name.component';
import { PasswordComponent } from './password/password.component';
import { PhoneComponent } from './phone/phone.component';

@Component({
  standalone: true,
  imports: [
    ShareModule,
    AvatarComponent,
    EmailComponent,
    NameComponent,
    PasswordComponent,
    PhoneComponent,
    TotpComponent
  ],
  selector: 'app-layout-profile',
  template: `
    <nz-page-header nzTitle="Profile">
      <nz-page-header-footer>
        <nz-tabset nzSize="small" [(nzSelectedIndex)]="index">
          <nz-tab nzTitle="Basic"></nz-tab>
          <nz-tab nzTitle="Security"></nz-tab>
          <nz-tab nzTitle="Collaboration"></nz-tab>
          <nz-tab nzTitle="History"></nz-tab>
        </nz-tabset>
      </nz-page-header-footer>
    </nz-page-header>

    <nz-card *ngIf="app.user() as u">
      <nz-list [ngSwitch]="index" nzItemLayout="vertical">
        <ng-container *ngSwitchCase="0">
          <nz-list-item>
            <nz-list-item-meta>
              <nz-list-item-meta-title><b>Email</b></nz-list-item-meta-title>
              <nz-list-item-meta-description> Set To: {{ u.email }}</nz-list-item-meta-description>
            </nz-list-item-meta>
            <nz-list-item-extra>
              <button nz-button nzType="primary" nzShape="circle" nz-tooltip="Modify" (click)="setEmail()">
                <i nz-icon nzType="edit"></i>
              </button>
            </nz-list-item-extra>
          </nz-list-item>
          <nz-list-item>
            <nz-list-item-meta>
              <nz-list-item-meta-title><b>Name</b></nz-list-item-meta-title>
              <nz-list-item-meta-description>
                <ng-container *ngIf="!!u.name; else emptyNameTpl"> Set to: {{ u.name }}</ng-container>
                <ng-template #emptyNameTpl>
                  <span>It is recommended to use a job title or real name</span>
                </ng-template>
              </nz-list-item-meta-description>
            </nz-list-item-meta>
            <nz-list-item-extra>
              <button nz-button nzType="primary" nzShape="circle" nz-tooltip="Modify" (click)="setName()">
                <i nz-icon nzType="edit"></i>
              </button>
            </nz-list-item-extra>
          </nz-list-item>
          <nz-list-item>
            <nz-list-item-meta>
              <nz-list-item-meta-title><b>Avatar</b></nz-list-item-meta-title>
              <nz-list-item-meta-description>
                It is recommended to use 256*256 sizes for the avatar.
              </nz-list-item-meta-description>
            </nz-list-item-meta>
            <ng-container *ngIf="!!u.avatar; else emptyAvatarTpl">
              <nz-avatar nzShape="square" [nzSize]="96" [nzSrc]="[u.avatar] | wpxAssets"></nz-avatar>
            </ng-container>
            <ng-template #emptyAvatarTpl>
              <nz-avatar nzShape="square" [nzSize]="96" nzIcon="user"></nz-avatar>
            </ng-template>
            <nz-list-item-extra>
              <button nz-button nzType="primary" nzShape="circle" nz-tooltip="Modify" (click)="setAvatar()">
                <i nz-icon nzType="edit"></i>
              </button>
            </nz-list-item-extra>
          </nz-list-item>
        </ng-container>
        <ng-container *ngSwitchCase="1">
          <nz-list-item>
            <nz-list-item-meta>
              <nz-list-item-meta-title><b>Password</b></nz-list-item-meta-title>
              <nz-list-item-meta-description>
                It is best to use a combination of uppercase letters, lowercase letters, numbers and special characters
                （&#64;$!%*?&-+）
              </nz-list-item-meta-description>
            </nz-list-item-meta>
            <nz-list-item-extra>
              <button nz-button nzType="primary" nzShape="circle" (click)="setPassword()">
                <i nz-icon nzType="edit"></i>
              </button>
            </nz-list-item-extra>
          </nz-list-item>
          <nz-list-item>
            <nz-list-item-meta>
              <nz-list-item-meta-title><b>Phone Number</b></nz-list-item-meta-title>
              <nz-list-item-meta-description>
                <ng-container *ngIf="!!u.phone; else phoneEmptyText"> Exists</ng-container>
                <ng-template #phoneEmptyText>
                  <span>
                    There is no mobile phone number set, which can be used for security-related operations such as
                    mobile phone verification and login or account recovery.
                  </span>
                </ng-template>
              </nz-list-item-meta-description>
            </nz-list-item-meta>
            <nz-list-item-extra>
              <nz-space>
                <ng-container *ngIf="!!u.phone; else phoneEmptyRef">
                  <button
                    *nzSpaceItem
                    nz-button
                    nzDanger
                    nzShape="circle"
                    nz-popconfirm
                    nzPopconfirmTitle="Are you sure you want to cancel?"
                    nzPopconfirmPlacement="bottom"
                    (nzOnConfirm)="unsetPhone()"
                  >
                    <i nz-icon nzType="close"></i>
                  </button>
                </ng-container>
                <ng-template #phoneEmptyRef>
                  <button *nzSpaceItem nz-button nzType="primary" nzShape="circle" (click)="setPhone()">
                    <i nz-icon nzType="edit"></i>
                  </button>
                </ng-template>
              </nz-space>
            </nz-list-item-extra>
          </nz-list-item>
          <nz-list-item>
            <nz-list-item-meta>
              <nz-list-item-meta-title><b>Authenticator</b></nz-list-item-meta-title>
              <nz-list-item-meta-description>
                <ng-container *ngIf="!!u.totp; else totpEmptyText">
                  <span>Exists</span>
                </ng-container>
                <ng-template #totpEmptyText>
                  <span
                    >No authenticator app set up, code when prompted to use the app on your phone for two-factor
                    authentication</span
                  >
                </ng-template>
              </nz-list-item-meta-description>
            </nz-list-item-meta>
            <nz-list-item-extra>
              <nz-space>
                <ng-container *ngIf="!!u.totp; else totpEmptyRef">
                  <button
                    *nzSpaceItem
                    nz-button
                    nzDanger
                    nzShape="circle"
                    nz-popconfirm
                    nzPopconfirmTitle="Are you sure you want to cancel?"
                    nzPopconfirmPlacement="bottom"
                    (nzOnConfirm)="unsetTotp()"
                  >
                    <i nz-icon nzType="close"></i>
                  </button>
                </ng-container>
                <ng-template #totpEmptyRef>
                  <button *nzSpaceItem nz-button nzType="primary" nzShape="circle" (click)="setTotp()">
                    <i nz-icon nzType="edit"></i>
                  </button>
                </ng-template>
              </nz-space>
            </nz-list-item-extra>
          </nz-list-item>
        </ng-container>
        <ng-container *ngSwitchCase="2">
          <nz-list-item>
            <nz-list-item-meta>
              <nz-list-item-meta-avatar>
                <nz-avatar nzShape="square" nzSize="large" [nzSrc]="['assets', 'Lark.png'] | wpxAssets"></nz-avatar>
              </nz-list-item-meta-avatar>
              <nz-list-item-meta-title><b>Lark</b></nz-list-item-meta-title>
              <nz-list-item-meta-description *ngIf="!u.lark"> Lark account not linked</nz-list-item-meta-description>
            </nz-list-item-meta>
            <nz-descriptions *ngIf="u.lark as lark" nzLayout="vertical" [nzColumn]="2">
              <nz-descriptions-item nzTitle="Name">{{ lark.name }}</nz-descriptions-item>
              <nz-descriptions-item nzTitle="English Name">
                {{ lark.en_name | nzSafeNull: '-' }}
              </nz-descriptions-item>
              <nz-descriptions-item nzTitle="Identifier" [nzSpan]="2">
                {{ lark.open_id }}
              </nz-descriptions-item>
            </nz-descriptions>
            <nz-list-item-extra>
              <ng-container *ngIf="u.lark; else linkLarkRef">
                <button
                  nz-button
                  nzDanger
                  nzShape="circle"
                  nz-popconfirm
                  nzPopconfirmTitle="Are you sure you want to cancel the association?"
                  nzPopconfirmPlacement="bottom"
                  (nzOnConfirm)="unlinkLark()"
                >
                  <i nz-icon nzType="close"></i>
                </button>
              </ng-container>
              <ng-template #linkLarkRef>
                <button nz-button nzType="link" (click)="linkLark()">Modify</button>
              </ng-template>
            </nz-list-item-extra>
          </nz-list-item>
        </ng-container>
        <ng-container *ngSwitchCase="3">
          <nz-list-item>
            <nz-list-item-meta>
              <nz-list-item-meta-title><b>Detail</b></nz-list-item-meta-title>
              <nz-list-item-meta-description>
                <nz-descriptions *ngIf="u.history as history" nzLayout="vertical" [nzColumn]="2">
                  <nz-descriptions-item nzTitle="Total Number Of Sessions">
                    <span>
                      It has been logged in <i> {{ u.sessions }} </i> times
                    </span>
                  </nz-descriptions-item>
                  <nz-descriptions-item nzTitle="Last Login Time">
                    {{ history.timestamp | date: 'medium' }}
                  </nz-descriptions-item>
                  <nz-descriptions-item nzTitle="IP">
                    <span> {{ history.metadata.client_ip }}</span>
                  </nz-descriptions-item>
                  <nz-descriptions-item nzTitle="ISP">
                    <nz-space *ngIf="u.history.detail as detail" [nzSplit]="spaceSplit">
                      <span *nzSpaceItem>{{ detail.isp }}</span>
                      <span *nzSpaceItem>{{ detail.timezone }}</span>
                    </nz-space>
                  </nz-descriptions-item>
                  <ng-container [ngSwitch]="u.history.metadata.version">
                    <ng-container *ngSwitchCase="'shuliancloud.v4'">
                      <nz-descriptions-item nzTitle="Geographic Information" [nzSpan]="2">
                        <nz-space *ngIf="u.history.detail as detail" [nzSplit]="spaceSplit">
                          <span *nzSpaceItem>{{ detail.country | wpxBlank: 'unknown' }}[{{ detail.continent }}]</span>
                          <span *nzSpaceItem>{{ detail.prov | wpxBlank: 'unknown' }}</span>
                          <span *nzSpaceItem>
                            {{ detail.city | wpxBlank: 'unknown' }}[{{ detail.lng }},{{ detail.lat }}]
                          </span>
                        </nz-space>
                      </nz-descriptions-item>
                    </ng-container>
                  </ng-container>
                </nz-descriptions>
              </nz-list-item-meta-description>
            </nz-list-item-meta>
          </nz-list-item>
        </ng-container>
      </nz-list>
    </nz-card>

    <ng-template #spaceSplit>
      <nz-divider nzType="vertical"></nz-divider>
    </ng-template>
  `
})
export class ProfileComponent {
  index = 0;

  constructor(
    public app: AppService,
    private modal: NzModalService,
    private message: NzMessageService,
    private router: Router,
    private drawer: NzDrawerRef
  ) {}

  private setModal(component: Type<void>, callback?: () => void): void {
    this.modal.create({
      nzTitle: `User`,
      nzWidth: 420,
      nzContent: component,
      nzOnOk: () => {
        if (!callback) {
          this.app.getUser().subscribe(() => {
            console.debug('user:update');
          });
          return;
        }
        callback();
      }
    });
  }

  setEmail(): void {
    this.setModal(EmailComponent, () => {
      this.app.logout().subscribe(() => {
        this.drawer.close();
        this.app.user.set(null);
        this.router.navigateByUrl('/login');
      });
    });
  }

  setName(): void {
    this.setModal(NameComponent);
  }

  setAvatar(): void {
    this.setModal(AvatarComponent);
  }

  setPassword(): void {
    this.setModal(PasswordComponent);
  }

  setPhone(): void {
    this.setModal(PhoneComponent);
  }

  unsetPhone(): void {
    this.app.unsetUser('phone').subscribe(() => {
      this.message.success(`Cancellation successful`);
      this.app.getUser().subscribe(() => {
        console.debug('user:update');
      });
    });
  }

  setTotp(): void {
    this.setModal(TotpComponent);
  }

  unsetTotp(): void {
    this.app.unsetUser('totp').subscribe(() => {
      this.message.success(`Cancellation successful`);
      this.app.getUser().subscribe(() => {
        console.debug('user:update');
      });
    });
  }

  linkLark(): void {
    this.app.oauth('link').subscribe(v => {
      const popup = window.open(v, '', 'width=800,height=640');
      const $timer = timer(0, 500).subscribe(() => {
        if (popup?.closed) {
          $timer.unsubscribe();
          this.app.getUser().subscribe(() => {
            console.debug('user:update');
          });
        }
      });
    });
  }

  unlinkLark(): void {
    this.app.unsetUser('lark').subscribe(() => {
      this.message.success(`Disassociation successful`);
      this.app.getUser().subscribe(() => {
        console.debug('user:update');
      });
    });
  }
}
