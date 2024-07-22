import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css']
})
export class ListClientComponent implements OnInit {

  listClient: Client [] =[];

  constructor(private _clientService:ClientService, private toastr: ToastrService){

  };

  ngOnInit(): void {
    this.getListClients();
    
  };

  getListClients(){
    this._clientService.getListClients().subscribe((data:Client[])=>{
      console.log(data)
      this.listClient=data;
    })
  };

  deleteClient(idClient: number) {
    console.log(idClient);
    this._clientService.deleteCliente(idClient).subscribe({
      next: () => {
        console.log('Eliminado');
        this.getListClients();
        this.toastr.warning('Eliminado Correctamente', 'Eliminar');
      },
      error: (error) => {
        console.error(error);
        if (error.status === 400) {
          this.toastr.error('No es posible eliminar el cliente porque está referenciado en préstamos', 'Error');
        } else {
          this.toastr.error('Ocurrió un error al intentar eliminar el monto', 'Error');
        }
      }
    });
  };

};

