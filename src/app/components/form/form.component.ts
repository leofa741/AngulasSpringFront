import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute} from '@angular/router';
import { Cliente } from 'src/app/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

public cliente: Cliente = new Cliente();
public title = 'Crear Cliente';

public editMode: boolean = false;

  
  

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute


  ) { }

  ngOnInit(  ) {

    this.cargarCliente();
  }

  public create(){
    console.log("Clicked");
    console.log(this.cliente);

    if(this.cliente.nombre == null || this.cliente.apellido == null || this.cliente.email == null){
      swal.fire('Error al crear el cliente', 'El nombre, apellido y email no pueden estar vacíos', 'error');
      return;
    }
    this.clienteService.create(this.cliente).subscribe(
      response => {
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo cliente', `Cliente ${this.cliente.nombre} creado con éxito!`, 'success')
        console.log(response);
      },
      err => {
        console.error(err.error.error);
        console.log(err);
        swal.fire('Error al crear el cliente', err.error.mensaje, 'error');
      }

      
    );   
    
  }	

  public cargarCliente(){

    this.activatedRoute.params.subscribe(params => {
      this.editMode = false;
      let id = params['id']
      if(id){
        this.editMode = true;
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente)
      }
    })

  }

  public update(){
    
    this.clienteService.update(this.cliente).subscribe( cliente => {
      this.router.navigate(['/clientes'])
      swal.fire('Cliente Actualizado', `Cliente ${this.cliente.nombre} actualizado con éxito!`, 'success')
    }

    )
  }




}
