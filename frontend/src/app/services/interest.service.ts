import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Interest } from '../interfaces/interest';

@Injectable({
  providedIn: 'root'
})
export class InterestService {

  private  myAppUrl: string;
  private myApiUrl: string;
  private periodUrl = 'http://localhost:3000/api/plazos';

  constructor(private http:HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl  ='api/intereses/'
  };

  getListInterest(): Observable<Interest[]>{
    return this.http.get<Interest[]>(this.myAppUrl + this.myApiUrl);

  };

  getInterest(idInterest: number): Observable<Interest>{
    return this.http.get<Interest>(this.myAppUrl + this.myApiUrl + idInterest);

  };

  postInterest(interest:Interest):Observable<void>{
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, interest);
  };

  deleteInterest(idInterest:number):Observable<void>{
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + idInterest);
 
  };

  getPeriod(): Observable<any[]> {
    return this.http.get<any[]>(`${this.periodUrl}`);
  };

  getPeriodById(idPeriod: number): Observable<any> {
    return this.http.get<any>(`${this.periodUrl}/${idPeriod}`);
  }


};
