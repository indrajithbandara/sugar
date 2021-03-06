import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs';

import { Pacient } from '../interfaces/pacient';

@Injectable()
export class PacientService {
  private url = 'http://sugar-api.herokuapp.com/pacients';

  constructor(private http: Http) {}

  getPacients(): Observable<Pacient[]> {
    return this.http.get(this.url)
      .map((res: Response) => {
        let body = res.json();
        return body || [];
      })
      .catch((error: Response | any) => {
        console.log(error);
        let errMsg: string;

        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }

        return Observable.throw(errMsg);
      });
  }

  getPacientsById(id : number): Observable<Pacient> {
    return this.http.get(this.url + '/' + id)
      .map((res: Response) => {
        let body = res.json();
        return body || [];
      })
      .catch((error: Response | any) => {
        console.log(error);
        let errMsg: string;

        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }

        return Observable.throw(errMsg);
      }).first();
  }

  createPacient(pacient: Pacient): Observable<Pacient> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.url, pacient, options)
      .map((res: Response) => {
        let body = res.json();
        return body || {}
      })
      .catch((error: Response | any) => {
        console.log(error);
        let errMsg: string;

        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }

        return Observable.throw(errMsg);
      });
  }
}
