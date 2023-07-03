import { Injectable } from '@angular/core';
import { CLIENTES } from '../pages/clientes/clientes.json';
import { Cliente } from '../cliente';
import { Observable, map, of, tap , catchError, throwError} from 'rxjs';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getClientes(): Observable<Cliente[]>{

   // return of(CLIENTES);
   return this.http.get(this.urlEndPoint).pipe(
      //tap(response => console.log('ClienteService: tap 1')),
      map(response => {

        let clientes = response as Cliente[];

        return clientes.map(cliente => {
          cliente.nombre = cliente.nombre.toUpperCase();
          //let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy');
          //cliente.createAt = formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
          return cliente;
        });
      }
      ),
      tap(response => {
        response.forEach(cliente => {
          console.log(cliente.nombre);
        });
      }
      )
    );
    
  }

  create(cliente: Cliente) : Observable<Cliente>{
    return this.http.post(this.urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.error);
       // Swal.fire('Error al crear el cliente', e.error.error, 'error');
        return throwError(e);
      }
      )
    );
  }

  getCliente(id:string): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        Swal.fire('Error al editar', e.error.mensaje, 'error');
        console.error(e.error.mensaje);
        return throwError(e);
      }
      )
    );
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.error);
        Swal.fire('Error al eliminar el cliente', e.error.error, 'error');
        return throwError(e);
      }
      )
    );
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
        console.error(e.error.error);
        Swal.fire('Error al editar el cliente', e.error.error, 'error');
        return throwError(e);
      }
      )
    );
  }
  
  



}
