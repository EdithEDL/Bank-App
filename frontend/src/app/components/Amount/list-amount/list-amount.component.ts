import { Component , OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Amount } from 'src/app/interfaces/amount';
import { AmountService } from 'src/app/services/amount.service';

@Component({
  selector: 'app-list-amount',
  templateUrl: './list-amount.component.html',
  styleUrls: ['./list-amount.component.css']
})
export class ListAmountComponent  implements OnInit{

  listAmount: Amount [] =[];

  constructor(private _amountService:AmountService, private toastr: ToastrService){
  };

  ngOnInit(): void {
    this.getListAmounts();
    
  };

  getListAmounts(){
    this._amountService.getListAmounts().subscribe((data:Amount[])=>{
      console.log(data);
      this.listAmount=data;

    });

  };

  deleteAmount(idAmount: number) {
    console.log(idAmount);
    this._amountService.deleteAmount(idAmount).subscribe({
      next: () => {
        console.log('Eliminado');
        this.getListAmounts();
        this.toastr.warning('Eliminado Correctamente', 'Eliminar');
      },
      error: (error) => {
        console.error(error);
        if (error.status === 400) {
          this.toastr.error('No es posible eliminar el monto porque está referenciado en préstamos', 'Error');
        } else {
          this.toastr.error('Ocurrió un error al intentar eliminar el monto', 'Error');
        }
      }
    });
  }



};
