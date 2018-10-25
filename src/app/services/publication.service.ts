import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Publication } from '../models/publication';
import { GLOBAL } from './global';


@Injectable()
export class PublicationService {
    public url: string;
    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addPublication(token, publication): Observable<any> {
        const params = JSON.stringify(publication);
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', token);
        return this._http.post(this.url + 'publication', params, {headers: headers});
    }

    getPublications(token, page = 1): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', token);
        return this._http.get(this.url + 'publications/' + page, {headers: headers});
    }

    deletePublication(token, id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                         .set('Authorization', token);
        return this._http.delete(this.url + 'publication/' + id, {headers: headers});
    }

}
