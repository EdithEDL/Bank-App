import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private  myAppUrl: string;
  private myApiUrl: string;

  constructor(private http:HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl  ='api/clientes/'
  };
  getListClients(): Observable<Client[]>{
    return this.http.get<Client[]>(this.myAppUrl + this.myApiUrl);

  };

  getClient(idClient: number): Observable<Client>{
    return this.http.get<Client>(this.myAppUrl + this.myApiUrl + idClient);

  };

  postClient(client:Client):Observable<void>{
    return this.http.post<void>(this.myAppUrl + this.myApiUrl, client);
  };

  deleteCliente(idClient:number):Observable<void>{
    return this.http.delete<void>(this.myAppUrl + this.myApiUrl + idClient);
 
  };

  putClient(idClient: number, client: Client): Observable<void>{
    return this.http.put<void>(this.myAppUrl + this.myApiUrl + idClient, client);

  };

};
