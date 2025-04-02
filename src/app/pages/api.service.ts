import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../interfaces/Character-interface';
import { catchError, map, Observable, retry, shareReplay, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public api='https://rickandmortyapi.com/api/character'
  public characters:Character[]=[];
  public charactersCopy=[...this.characters]
  private cache$?: Observable<Character>; // Caché opcional

  constructor(
    private http: HttpClient,
    // private router: Router,
    // private authService: AuthService,
    // private configService: ConfigService,
    // private store: Store<AppState>,
    // private actions$: Actions    
  ) { }

  getCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.api}/${id}`)
      .pipe(
        retry(2),
        map(response => {
          console.log('Datos recibidos:', response);
          return response;
        })
      );
  }     
  
    // --- MÉTODO CORREGIDO ---
    getCharacters(page: number = 1): Observable<Character> { // Devuelve la interfaz completa
      const params = new HttpParams().set('page', page.toString());
  
      // Eliminamos la lógica de caché simple que causaba el problema
      return this.http.get<Character>(this.api, { params }).pipe(
        retry(2), // Reintentar si falla
        map(response => {
          console.log(`Datos de la página ${page} recibidos:`, response);
          return response; // Devuelve toda la respuesta { info, results }
        }),
        catchError(this.handleError) // Manejo de errores
      );
    }
  
    private handleError(error: HttpErrorResponse): Observable<never> {
      let errorMessage = 'Error desconocido';
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error del cliente: ${error.error.message}`;
      } else {
        errorMessage = `Error del servidor (Código ${error.status}): ${error.message}`;
      }
      console.error(errorMessage);
      return throwError(() => new Error(errorMessage));
    }

}
