import { Component, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Amount } from 'src/app/interfaces/amount';
import { AmountService } from 'src/app/services/amount.service';


@Component({
  selector: 'app-add-edit-amount',
  templateUrl: './add-edit-amount.component.html',
  styleUrls: ['./add-edit-amount.component.css']
})
export class AddEditAmountComponent implements OnInit {

  operacion: string = 'Agregar';
  form: FormGroup;
  idAmount:number;



  constructor(private fb:FormBuilder, private aRouter:ActivatedRoute,
    private toastr: ToastrService, private _amountService:AmountService){
    this.form = this.fb.group({
      totalAmount: ['', Validators.required],
    });
    //aRouter.snapshot.paramMap.get('id');
    this.idAmount= Number(aRouter.snapshot.paramMap.get('idAmount'));
    console.log(this.idAmount);
    
  };

  ngOnInit(): void {

    if(this.idAmount != 0){
      this.operacion = 'Editar';
    };
    this.getAmount(this.idAmount);

  };

  getAmount(idAmount:number){
    this._amountService.getAmount(idAmount).subscribe((data:Amount)=>{

      console.log(data);
      this.form.setValue({
        totalAmount: data.totalAmount,
      });

    });

  };

  addAmount(){
    const amount: Amount = {
     totalAmount: this.form.value.totalAmount
    };
    console.log(amount);

    if(this.idAmount !==0){

      amount.idAmount= this.idAmount;
      this._amountService.putAmount(this.idAmount,amount).subscribe(()=>{
      console.log('Monto Editado');
      this.toastr.success(`El monto ${amount.totalAmount} es Editado Corectamente`, 'Editar');

      });

    } else{

      this._amountService.postAmount(amount).subscribe(()=>{
        console.log('Monto Agregado');
        this.toastr.success('Agregado Corectamente', 'Agregar');
      

     });

    }
    setTimeout(() => {
      window.location.href = '/montos';
    }, 800); // Retraso de 0.7 segundos



  };

};
