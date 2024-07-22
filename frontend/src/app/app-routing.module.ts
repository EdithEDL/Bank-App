import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListClientComponent } from './components/Client/list-client/list-client.component';
import { ListLoanComponent } from './components/Loan/list-loan/list-loan.component';
import { ListAmountComponent } from './components/Amount/list-amount/list-amount.component';
import { ListPeriodComponent } from './components/Period/list-period/list-period.component';
import { AddEditAmountComponent } from './components/Amount/add-edit-amount/add-edit-amount.component';
import { AddEditClientComponent } from './components/Client/add-edit-client/add-edit-client.component';
import { AddEditLoanComponent } from './components/Loan/add-edit-loan/add-edit-loan.component';
import { AddEditPeriodComponent } from './components/Period/add-edit-period/add-edit-period.component';
import { AmortizacionComponent } from './components/amortizacion/amortizacion.component';
import { ListaInterestComponent } from './components/Interest/lista-interest/lista-interest.component';
import { AddInterestComponent } from './components/Interest/add-interest/add-interest.component';


const routes: Routes = [

  {path: '', component: ListLoanComponent},
  {path: 'amortizacion/:idLoan', component: AmortizacionComponent},
  {path: 'cliente', component: ListClientComponent},
  {path: 'montos', component: ListAmountComponent},
  {path: 'plazos', component: ListPeriodComponent},
  {path: 'intereses', component: ListaInterestComponent},
  {path: 'agregarIntereses', component: AddInterestComponent},
  {path: 'agregarMontos', component: AddEditAmountComponent},
  {path: 'editarMontos/:idAmount', component: AddEditAmountComponent},
  {path: 'agregarCliente', component: AddEditClientComponent},
  {path: 'editarCliente/:idClient', component: AddEditClientComponent},
  {path: 'agregarPrestamo', component: AddEditLoanComponent},
  {path: 'agregarPlazo', component: AddEditPeriodComponent},
  {path: 'editarPlazo/:idPeriod', component: AddEditPeriodComponent},
  {path: '**', redirectTo:'', pathMatch:'full'}

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
