import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
      this.genrateOptionForPost(options)
    );
  }
  public put<T, U>(
    url: string,
    paramter: T,
    option?: IHttpOption
  ): Observable<U> {
    return this.httpClient.put<U>(
      this.getCompleteUrl(url),
      paramter,
      this.genrateOptionForPost(option)
    );
  }

  public delete<T>(url: string, option?: IHttpOption): Observable<T> {
    return this.httpClient.delete<T>(this.getCompleteUrl(url), option);
  }

  public fileDownload<T>(
    url: string,
    filename: string,
    fileType: string,
    apiParameter: T
  ) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient
      .post(this.getCompleteUrl(url), apiParameter, { headers })
      .pipe(
        map(({ fileContents }: { fileContents: string }) => {
          if (fileContents) {
            const byteArray = new Uint8Array(
              atob(fileContents)
                .split('')
                .map((char) => char.charCodeAt(0))
            );
            const blob = new Blob([byteArray], { type: fileType });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
            window.URL.revokeObjectURL(link.href);
          }
        })
      );
  }
  private getCompleteUrl(url: string): string {
    return `${this.apiBaseUrl}/${url}`;
  }
  private genrateOptionForPost(option: IHttpOption) {
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
