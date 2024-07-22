import { Component , OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Period } from 'src/app/interfaces/period';
import { PeriodService } from 'src/app/services/period.service';

@Component({
  selector: 'app-list-period',
  templateUrl: './list-period.component.html',
  styleUrls: ['./list-period.component.css']
})
export class ListPeriodComponent  implements OnInit{

  listPeriod: Period [] =[];

  constructor(private _periodService:PeriodService , private toastr: ToastrService){

  };


  ngOnInit(): void {
    this.getListPeriods();
    
  };

  getListPeriods(){
    this._periodService.getLisPeriods().subscribe((data:Period[])=>{
      console.log(data);
      this.listPeriod=data;

    });

  };

  
  deletePeriod(idPeriod: number) {
    console.log(idPeriod);
    this._periodService.deletePeriod(idPeriod).subscribe({
      next: () => {
        console.log('Eliminado');
        this.getListPeriods();
        this.toastr.warning('Eliminado Correctamente', 'Eliminar');
      },
      error: (error) => {
        console.error(error);
        if (error.status === 400) {
          this.toastr.error('No es posible eliminar el plazo porque está referenciado en préstamos', 'Error');
        } else if (error.status === 404) {
          this.toastr.error('No existe el plazo con el ID especificado', 'Error');
        } else {
          this.toastr.error('Ocurrió un error al intentar eliminar el plazo', 'Error');
        }
      }
    });
  }


};
