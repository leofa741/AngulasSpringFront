import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes!: Cliente[];

  constructor(
 private clienteService: ClienteService
  ) { }



  ngOnInit() {
      this.clienteService.getClientes().subscribe(
        clientes => this.clientes = clientes  
       );
        } 

        public delete(cliente: Cliente){

          swal.fire({
            title: 'Está seguro?',
            text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
          }).then((result) => {
            if (result.value) {
              
              this.clienteService.delete(cliente.id).subscribe(
                response => {
                  this.clientes = this.clientes.filter(cli => cli !== cliente)
                  swal.fire(
                    'Cliente Eliminado!',
                    `Cliente ${cliente.nombre} eliminado con éxito.`,
                    'success'
                  )
                }
              )
              
            } 
          })
         
        }






}
