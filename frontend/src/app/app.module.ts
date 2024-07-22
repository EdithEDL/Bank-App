import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


//Modulos
import{ ReactiveFormsModule } from '@angular/forms';
import{ HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';



//Componentes
import { NavbarComponent } from './components/navbar/navbar.component';

import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { ListClientComponent } from './components/Client/list-client/list-client.component';
import { ListAmountComponent } from './components/Amount/list-amount/list-amount.component';
import { ListLoanComponent } from './components/Loan/list-loan/list-loan.component';
import { ListPeriodComponent } from './components/Period/list-period/list-period.component';
import { AddEditClientComponent } from './components/Client/add-edit-client/add-edit-client.component';
import { AddEditLoanComponent } from './components/Loan/add-edit-loan/add-edit-loan.component';
import { AddEditPeriodComponent } from './components/Period/add-edit-period/add-edit-period.component';
import { AddEditAmountComponent } from './components/Amount/add-edit-amount/add-edit-amount.component';
import { AmortizacionComponent } from './components/amortizacion/amortizacion.component';
import { ListaInterestComponent } from './components/Interest/lista-interest/lista-interest.component';
import { AddInterestComponent } from './components/Interest/add-interest/add-interest.component';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProgressBarComponent,
    ListClientComponent,
    ListAmountComponent,
    ListLoanComponent,
    ListPeriodComponent,
    AddEditClientComponent,
    AddEditLoanComponent,
    AddEditPeriodComponent,
    AddEditAmountComponent,
    AmortizacionComponent,
    ListaInterestComponent,
    AddInterestComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({ 
      timeOut : 10000 , 
      positionClass : 'toast-bottom-right' , 
      preventDuplicates : true , 
    } ),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
