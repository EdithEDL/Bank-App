import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Interest } from 'src/app/interfaces/interest';
import { InterestService } from 'src/app/services/interest.service';


@Component({
  selector: 'app-add-interest',
  templateUrl: './add-interest.component.html',
  styleUrls: ['./add-interest.component.css']
})
export class AddInterestComponent implements OnInit {

  operacion: string = 'Agregar';
  form: FormGroup;
  periods: any[] = [];

  constructor(private fb:FormBuilder, private aRouter:ActivatedRoute,
    private _interestService:InterestService, private toastr: ToastrService){
    this.form = this.fb.group({
      idPeriod: ['', Validators.required],
      interest: ['', Validators.required]

    });
    
  };

  ngOnInit(): void {
    this.loadPeriod();
    
  };

  loadPeriod() {
    this._interestService.getPeriod().subscribe((response: any) => {
        this.periods = response; 
        console.log(this.periods)
      },
      (error: any) => {
        console.error('Error al obtener la lista de Plazos:', error);
      }
    );
  };

  addInterest(){
    console.log('agregando');

    const interest: Interest = {
      idPeriod: this.form.value.idPeriod,
      interest: this.form.value.interest,
    };

    console.log(interest);
    this._interestService.postInterest(interest).subscribe(()=>{
      console.log('Interes Agregado');
      this.toastr.success('Agregado Corectamente', 'Agregar');
    
     });

     setTimeout(() => {
      window.location.href = '/intereses';
    }, 800); // Retraso de 0.7 segundos

  };

};
