import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Library {
    Number: number;
    FullName: string;
    CommonName: string;
    OrgInfo: OrganizationInfo[]
    Address: string;
    [key: string]: any;
}

export interface OrganizationInfo {
    ChiefName: string;
    ChiefPosition: string;
    FullName: string;
    INN: string;
    KPP: string;
    LegalAddress: string;
    [key: string]: any;
}

const API_KEY = 'a087bc7a-5caa-46c8-8782-40c94a06ba2c';
const API_VERSION = 'v1';

@Injectable({
    providedIn: 'root'
})
export class LibraryService {

    constructor(private http: HttpClient) { }

    private baseUrl = `https://apidata.mos.ru/${API_VERSION}`;


    getLibraries(
        pageSize: number = 50,
        pageIndex: number = 0,
        searchTerm: string = ''
    ): Observable<Library[]> {
        let params = new HttpParams()
            .set('api_key', API_KEY)
            .set('$top', pageSize)
            .set('$skip', (pageIndex * pageSize).toString());

        if (searchTerm.trim()) {
            params = params.set(
                '$filter',
                `Cells/FullName eq '${searchTerm}'`
            );
        }

        const url = `${this.baseUrl}/datasets/526/rows`;

        return this.http.get<any[]>(url, { params }).pipe(
            catchError(() => of([])),
            map(response =>
                response.map((item, index) => ({
                    Number: pageIndex * pageSize + index + 1,
                    ...item.Cells
                }))
            )
        );
    }
}