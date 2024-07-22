import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Client } from 'src/app/interfaces/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-add-edit-client',
  templateUrl: './add-edit-client.component.html',
  styleUrls: ['./add-edit-client.component.css']
})
export class AddEditClientComponent implements OnInit{

  operacion: string = 'Agregar';
  form: FormGroup;
  idClient:number;


  constructor(private fb:FormBuilder, private aRouter:ActivatedRoute,
    private _clientService:ClientService, private toastr: ToastrService){
    this.form = this.fb.group({
      nameClient: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],

    });
    //aRouter.snapshot.paramMap.get('id');
    this.idClient= Number(aRouter.snapshot.paramMap.get('idClient'));
    console.log(this.idClient);
    
  };

  ngOnInit(): void {

    if(this.idClient != 0){
      this.operacion = 'Editar';
    };
    this.getClient(this.idClient);

  };

  getClient(idClient:number){
    this._clientService.getClient(idClient).subscribe((data:Client)=>{
      console.log(data);
      this.form.setValue({
        nameClient: data.nameClient,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,

      });

    });

  };

  addClient(){
    console.log('agregando');

    const client: Client = {
     nameClient: this.form.value.nameClient,
     lastName:this.form.value.lastName,
     email:this.form.value.email,
     phone:this.form.value.phone,

    };
    console.log(client);

    if(this.idClient !==0){

      client.idClient= this.idClient;
      this._clientService.putClient(this.idClient,client).subscribe(()=>{
      console.log('Cliente Editado');
      this.toastr.success(`El cliente ${client.nameClient} es Editado Corectamente`, 'Editar');

      });

    } else{

      this._clientService.postClient(client).subscribe(()=>{
        console.log('Cliente Agregado');
        this.toastr.success('Agregado Corectamente', 'Agregar');
      

     });

    }
    setTimeout(() => {
      window.location.href = '/cliente';
    }, 700); // Retraso de 0.7 segundos

  };


}
