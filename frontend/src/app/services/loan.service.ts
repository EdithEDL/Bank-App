import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Loan } from '../interfaces/loan';




@Injectable({
  providedIn: 'root'
})
export class LoanService {

  private  myAppUrl: string;
  private myApiUrl: string;

  private clientUrl = 'http://localhost:3000/api/clientes';
  private amountUrl = 'http://localhost:3000/api/montos';
  private periodUrl = 'http://localhost:3000/api/plazos';
  private interestUrl = 'http://localhost:3000/api/intereses';



  constructor(private http:HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl  ='api/prestamos/'
  };

  getListLoan(): Observable<Loan[]>{
    return this.http.get<Loan[]>(this.myAppUrl + this.myApiUrl);

  };

  getLoan(idLoan: number): Observable<Loan>{
    return this.http.get<Loan>(this.myAppUrl + this.myApiUrl + idLoan);

  };

  postLoan(loan:Loan):Observable<void>{
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, loan);
  };

  deleteLoan(idLoan:number):Observable<void>{
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + idLoan);
  };

  getClient(): Observable<any[]> {
    return this.http.get<any[]>(`${this.clientUrl}`);
  };

  getAmount(): Observable<any[]> {
    return this.http.get<any[]>(`${this.amountUrl}`);
  };

  getPeriod(): Observable<any[]> {
    return this.http.get<any[]>(`${this.periodUrl}`);
  };

  getInterest(): Observable<any[]> {
    return this.http.get<any[]>(`${this.interestUrl}`);
  };

  getClientById(idClient: number): Observable<any> {
    return this.http.get<any>(`${this.clientUrl}/${idClient}`);
  }

  getAmountById(idAmount: number): Observable<any> {
    return this.http.get<any>(`${this.amountUrl}/${idAmount}`);
  }

  getPeriodById(idPeriod: number): Observable<any> {
    return this.http.get<any>(`${this.periodUrl}/${idPeriod}`);
  }

  getInterestById(idInterest: number): Observable<any> {
    return this.http.get<any>(`${this.interestUrl}/${idInterest}`);
  }

  getInterestByPeriod(idPeriod: number): Observable<any[]> {
    console.log('Solicitando intereses para el periodo:', idPeriod); 
    return this.http.get<any[]>(`${this.interestUrl}?idPeriod=${idPeriod}`);
}



};



