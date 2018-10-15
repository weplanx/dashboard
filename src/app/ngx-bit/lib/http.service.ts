import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ConfigService} from './config.service';
import {BitService} from './bit.service';
import {Observable, of} from 'rxjs';
import {LocalStorage} from '@ngx-pwa/local-storage';
import {switchMap} from 'rxjs/operators';

@Injectable()
export class HttpService {
  private token: any;
  private refresh_token: any;

  constructor(private http: HttpClient,
              private config: ConfigService,
              private storage: LocalStorage,
              private bit: BitService) {
  }

  /**
   * TODO:是否满足登录状态
   */
  private isLogin(): Observable<boolean> {
    return this.storage.getItem('username').pipe(
      switchMap(data => {
        if (data) {
          return this.storage.getItem('token');
        } else {
          return of(false);
        }
      }),
      switchMap(data => {
        if (data) {
          this.token = data;
          return this.storage.getItem('refresh_token');
        } else {
          return of(false);
        }
      }),
      switchMap(data => {
        if (data) {
          this.refresh_token = data;
          return of(true);
        } else {
          return of(false);
        }
      })
    );
  }

  /**
   * TODO:发送请求
   * @param url api路由地址
   * @param body 发送数据
   * @param jwt 是否验证jwt
   */
  req(url: string, body: any = {}, jwt = true): Observable<any> {
    if (!jwt) {
      return this.client(url, body);
    } else {
      return this.isLogin().pipe(
        switchMap(status => {
          if (status) {
            return this.clientWithToken(url, body);
          } else {
            return of({
              error: 1
            });
          }
        })
      );
    }
  }

  /**
   * TODO:请求对象
   * @param url 地址
   * @param body 数据
   */
  private client(url: string, body: any = {}): Observable<any> {
    return this.http.post(this.config.origin + url, body, {
      withCredentials: this.config.withCredentials
    });
  }

  /**
   * TODO:附带Token的请求对象
   * @param url
   * @param body
   */
  private clientWithToken(url: string, body: any = {}): Observable<any> {
    return this.http.post(this.config.origin + url, body, {
      headers: new HttpHeaders({
        'X-Token': this.token
      }),
      withCredentials: this.config.withCredentials
    }).pipe(
      switchMap((res: any) => {
        if (res.error === 1 &&
          res.msg !== undefined &&
          res.msg === 'Expired token') {
          return this.requestTokenExpired(url, body);
        } else {
          return of(res);
        }
      })
    );
  }

  /**
   * TODO:Token超时使用RefreshToken刷新Token
   * @param url
   * @param data
   */
  private requestTokenExpired(url: string, data: any = {}): Observable<any> {
    return this.req('main/refreshToken', {
      refresh_token: this.refresh_token
    }, false).pipe(
      switchMap(res => {
        if (!res.error) {
          this.token = res.data.token;
          return this.storage.setItem('token', res.data.token);
        } else {
          return of(false);
        }
      }),
      switchMap(status => {
        if (status) {
          return this.clientWithToken(url, data);
        } else {
          return of({
            error: 1
          });
        }
      })
    );
  }
}