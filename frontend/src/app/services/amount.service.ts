import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Amount } from '../interfaces/amount';

@Injectable({
  providedIn: 'root'
})
export class AmountService {

  private  myAppUrl: string;
  private myApiUrl: string;

  constructor(private http:HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl  ='api/montos/'
  };

  getListAmounts(): Observable<Amount[]>{
    return this.http.get<Amount[]>(this.myAppUrl + this.myApiUrl);

  };

  getAmount(idAmount: number): Observable<Amount>{
    return this.http.get<Amount>(this.myAppUrl + this.myApiUrl + idAmount);

  };

  postAmount(amount:Amount):Observable<void>{
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, amount);
  };

  deleteAmount(idAmount:number):Observable<void>{
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + idAmount);
 
  };

  putAmount(idAmount: number, amount: Amount): Observable<void>{
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + idAmount, amount);

  };


};
