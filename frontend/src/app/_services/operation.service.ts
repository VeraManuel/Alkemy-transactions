import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api';


@Injectable({
  providedIn: 'root'
})
export class OperationService {


  constructor(private http: HttpClient,) {   }

  getOperations(token, params): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization', token);

    return this.http.get(API_URL + '/operation', {headers:headers , params})
  }

  getOperationsTotal(token): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization', token);

    return this.http.get(API_URL + '/operation-total',  {headers:headers})
  }

    create(token,data): Observable<any> {
      console.log(data);
      
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);

      return this.http.post(API_URL + '/operation', data, {headers:headers})
  }

    update(token,id, data): Observable<any> {
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);

      return this.http.put(API_URL + '/operation/' + id, data, {headers:headers})
  }

    delete(token,id): Observable<any> {
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);

      return this.http.delete(API_URL + '/operation/' + id, {headers:headers})
  }

      getOperation(token,id): Observable<any> {
      let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);

      return this.http.get(API_URL + '/operation/' + id, {headers:headers})
  }

}


