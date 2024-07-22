import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Loan } from 'src/app/interfaces/loan';
import { LoanService } from 'src/app/services/loan.service';

@Component({
  selector: 'app-list-loan',
  templateUrl: './list-loan.component.html',
  styleUrls: ['./list-loan.component.css']
})
export class ListLoanComponent implements OnInit{

  listLoan: Loan [] =[];

  constructor(private _loanService:LoanService, private toastr: ToastrService,
    private router: Router){

  };

  ngOnInit(): void {

    this.getListLoans();
  
  }
  getListLoans(){
    this._loanService.getListLoan().subscribe((data:Loan[])=>{
      console.log(data);
      this.listLoan=data;

    });

  };

  deleteLoan(idLoan:number){
    console.log(idLoan)
    this._loanService.deleteLoan(idLoan).subscribe(()=>{
      console.log('Eliminado');
      this.getListLoans();
      this.toastr.warning('Elimando Corectamente', 'Eliminado')
    });

  };

  goToAmortization(itemLoan: any) {
    this.router.navigate(['/amortizacion', itemLoan.idLoan])
    
  }

};
