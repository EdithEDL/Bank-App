import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Interest } from 'src/app/interfaces/interest';
import { InterestService } from 'src/app/services/interest.service';

@Component({
  selector: 'app-lista-interest',
  templateUrl: './lista-interest.component.html',
  styleUrls: ['./lista-interest.component.css']
})
export class ListaInterestComponent implements OnInit{

  listInterest: Interest [] =[];

  constructor(private _interestService:InterestService, private toastr: ToastrService){
  };

  ngOnInit(): void {
    this.getListInterest()
    
  };

  getListInterest(){
    this._interestService.getListInterest().subscribe((data:Interest[])=>{
      console.log(data);
      this.listInterest=data;

    });
  };

  deleteInterest(idInterest: number) {
    console.log(idInterest);
    this._interestService.deleteInterest(idInterest).subscribe({
      next: () => {
        console.log('Eliminado');
        this.getListInterest();
        this.toastr.warning('Eliminado Correctamente', 'Eliminar');
      },
      error: (error) => {
        console.error(error);
        if (error.status === 400) {
          this.toastr.error('No es posible eliminar el interes porque está referenciado en préstamos', 'Error');
        } else {
          this.toastr.error('Ocurrió un error al intentar eliminar el monto', 'Error');
        }
      }
    });
  };


};
