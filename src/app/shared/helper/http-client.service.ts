import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AppHttpClient {
  apiBaseUrl: string;
  constructor(private readonly httpClient: HttpClient) {
    this.apiBaseUrl = environment.apiBaseUrl;
  }
  public get<T>(url: string, options?: IHttpOption): Observable<T> {
    return this.httpClient.get<T>(this.getCompleteUrl(url), options);
  }
  // here T -> parameter and U return Type
  public post<T, U>(
    url: string,
    parameter: T,
    options?: IHttpOption
  ): Observable<U> {
    return this.httpClient.post<U>(
      this.getCompleteUrl(url),
      parameter,
      this.genrateOptionFForPost(options)
    );
  }

  private getCompleteUrl(url: string): string {
    return `${this.apiBaseUrl}/${url}`;
  }
  private genrateOptionFForPost(option: IHttpOption) {
    return {
      ...option,
      ...{
        headers: new HttpHeaders({
          ...(option || {}).headers,
          ...{ 'cotent-type': 'application/json' },
        }),
      },
    };
  }
}
interface IHttpOption {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  observe?: 'body';
  params?: HttpParams | { [param: string]: string | string[] };
  reportProgress?: boolean;
  resposeType?: 'json';
  withCredentials?: boolean;
}
