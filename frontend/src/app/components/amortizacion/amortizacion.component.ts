import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Loan } from 'src/app/interfaces/loan';
import { LoanService } from 'src/app/services/loan.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-amortizacion',
  templateUrl: './amortizacion.component.html',
})
export class AmortizacionComponent implements OnInit {

  selectedLoan!: Loan;
  amortizationSchedule: any[] = [];
  totalLoan!: number;

  constructor(
    private route: ActivatedRoute,
    private _loanService: LoanService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idLoan = +params.get('idLoan')!;
      if (idLoan) {
        this.loanAmortization(idLoan);
      }
    });
  }

  loanAmortization(idLoan: number) {
    this._loanService.getLoan(idLoan).subscribe((loan: Loan) => {
      forkJoin([

        this._loanService.getClientById(loan.idClient),
        this._loanService.getAmountById(loan.idAmount),
        this._loanService.getPeriodById(loan.idPeriod),
        this._loanService.getInterestById(loan.idInterest)

      ]).subscribe(([client, amount, period, interest]) => {

        loan.Cliente = client;
        loan.Monto = amount;
        loan.Plazo = period;
        loan.Interest = interest;
        this.selectedLoan = loan;

        this.calculateAmortization();

      });
    });
  }

  calculateAmortization() {

    const totalAmount = this.selectedLoan.Monto?.totalAmount!;
    const interestValue = this.selectedLoan.Interest?.interest!;
    const interes = interestValue / 100;
    const periods = parseInt(this.selectedLoan.Plazo?.description!);
    const totalInterest = totalAmount * interes * periods;
    this.totalLoan = totalAmount + totalInterest;
    const biweeklyInterest = totalAmount * interes;
    
    let createdAt = new Date(this.selectedLoan.createdAt!);
    const biweeklyPayment = this.totalLoan / periods;
    let remainingBalance = this.totalLoan;

    for (let i = 0; i < periods; i++) {
      const paymentNumber = i + 1;
      const paymentDate = new Date(createdAt);
      paymentDate.setDate(createdAt.getDate() + 15 + i * 15);

      const interestPayment = biweeklyInterest;
      const principalPayment = biweeklyPayment - interestPayment;

      if (i === periods - 1) {
        remainingBalance = 0;
      } else {
        remainingBalance -= biweeklyPayment;
      }

      this.amortizationSchedule.push({
        paymentNumber: paymentNumber,
        paymentDate: paymentDate.toLocaleDateString(),
        totalPayment: biweeklyPayment,
        interestPayment: interestPayment,
        principalPayment: principalPayment,
        remainingBalance: remainingBalance
      });
    }

  }
}

