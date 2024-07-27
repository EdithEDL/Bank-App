import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { Loan } from 'src/app/interfaces/loan';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-add-edit-loan',
  templateUrl: './add-edit-loan.component.html',
  styleUrls: ['./add-edit-loan.component.css']
})
export class AddEditLoanComponent implements OnInit{

  operacion: string = 'Agregar';
  form: FormGroup;
  clients: any[] = [];
  amounts: any[] = [];
  periods: any[] = [];
  interest: any[] = [];

  constructor(private fb:FormBuilder, private aRouter:ActivatedRoute,
    private _loanService:LoanService, private toastr: ToastrService){
    this.form = this.fb.group({
      idClient: ['', Validators.required],
      idAmount: ['', Validators.required],
      idPeriod: ['', Validators.required], 
      idInterest:['', Validators.required]

    });
    
  };

  ngOnInit(): void {
    this.loadAmount();
    this.loadClient();
    this.loadPeriod();
    this.loadInterestbyidPeriod();
    
  };

  loadClient() {
    this._loanService.getClient().subscribe((response: any) => {
        this.clients = response; 
        console.log(this.clients)
      },
      (error: any) => {
        console.error('Error al obtener la lista de Clientes:', error);
      }
    );
  };

  loadAmount() {
    this._loanService.getAmount().subscribe((response: any) => {
        this.amounts = response; 
        console.log(this.amounts)

      },
      (error: any) => {
        console.error('Error al obtener la lista de Montos:', error);
      }
    );
  };

  loadPeriod() {
    this._loanService.getPeriod().subscribe((response: any) => {
        this.periods = response; 
        console.log(this.periods)

      },
      (error: any) => {
        console.error('Error al obtener la lista de Plazos:', error);
      }
    );
  };

  loadInterestbyidPeriod() {
    this.form.get('idPeriod')?.valueChanges.pipe(
      switchMap(idPeriod => {
        return this._loanService.getInterestByPeriod(idPeriod);
      })
    ).subscribe((interests: any[]) => {
      if (interests.length > 0) {
        const selectedPeriodId = Number(this.form.get('idPeriod')?.value);
  
        // Encuentra el interés donde idPeriod coincide
        const selectedInterest = interests.find(interest => {
          const interestPeriodId = Number(interest.idPeriod);;
          return interestPeriodId === selectedPeriodId;
        });
  
        if (selectedInterest) {
          this.form.patchValue({ idInterest: selectedInterest.idInterest });
        } else {
          this.form.patchValue({ idInterest: null });
        }
      } else {
        this.form.patchValue({ idInterest: null });
        console.log('Error al obtener el id del Interest');
      }
    });
  }
  ;
  
  
  
  
  

  addLoan(){
    console.log('agregando');

    const loan: Loan = {
      idClient: this.form.value.idClient,
      idAmount: this.form.value.idAmount,
      idPeriod: this.form.value.idPeriod,
      idInterest: this.form.value.idInterest

    };

    console.log(loan);
    this._loanService.postLoan(loan).subscribe(()=>{
      console.log('Monto Agregado');
      this.toastr.success('Agregado Corectamente', 'Agregar');
    
     });

     setTimeout(() => {
      window.location.href = '/';
    }, 800); // Retraso de 0.7 segundos

  };

};
