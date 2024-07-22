import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Period } from '../interfaces/period';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  private  myAppUrl: string;
  private myApiUrl: string;

  constructor(private http:HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl  ='api/plazos/'
  };

  getLisPeriods(): Observable<Period[]>{
    return this.http.get<Period[]>(this.myAppUrl + this.myApiUrl);

  };

  getPeriod(idPeriod: number): Observable<Period>{
    return this.http.get<Period>(this.myAppUrl + this.myApiUrl + idPeriod);

  };

  postPeriod(period:Period):Observable<void>{
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, period);
  };

  deletePeriod(idPeriod:number):Observable<void>{
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + idPeriod);
 
  };

  putPeriod(idPeriod: number, period: Period): Observable<void>{
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + idPeriod, period);

  };

};
