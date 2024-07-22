import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Period } from 'src/app/interfaces/period';
import { PeriodService } from 'src/app/services/period.service';

@Component({
  selector: 'app-add-edit-period',
  templateUrl: './add-edit-period.component.html',
  styleUrls: ['./add-edit-period.component.css']
})
export class AddEditPeriodComponent implements OnInit {

  operacion: string = 'Agregar';
  form: FormGroup;
  idPeriod:number;


  constructor(private fb:FormBuilder, private aRouter:ActivatedRoute,
    private toastr: ToastrService, private _periodService:PeriodService){
    this.form = this.fb.group({
      description: ['', Validators.required],
    });
    //aRouter.snapshot.paramMap.get('id');
    this.idPeriod= Number(aRouter.snapshot.paramMap.get('idPeriod'));
    console.log(this.idPeriod);
    
  };


  ngOnInit(): void {
    if(this.idPeriod != 0){
      this.operacion = 'Editar';
    };
    this.getAmount(this.idPeriod);
  };

  getAmount(idPeriod:number){
    this._periodService.getPeriod(idPeriod).subscribe((data:Period)=>{
      console.log(data);
      this.form.setValue({
        description: data.description,
      });

    });

  };

  addPeriod(){
    const period: Period = {
     description: this.form.value.description,

    };
    console.log(period);

    if(this.idPeriod !==0){

      period.idPeriod= this.idPeriod;
      this._periodService.putPeriod(this.idPeriod,period).subscribe(()=>{
      console.log('Plazo Editado');
      this.toastr.success(`El plazo ${period.description} es Editado Corectamente`, 'Editar');

      });

    } else{

      this._periodService.postPeriod(period).subscribe(()=>{
        console.log('Plazo Agregado');
        this.toastr.success('Agregado Corectamente', 'Agregar');
      

     });

    }
    setTimeout(() => {
      window.location.href = '/plazos';
    }, 800); // Retraso de 0.7 segundos




  };


};
