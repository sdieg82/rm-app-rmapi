import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  getCharacters(forceRefresh: boolean = false): Observable<Character> {
    if (!this.cache$ || forceRefresh) {
      this.cache$ = this.http.get<Character>(this.api).pipe(
        retry(2), // Intenta la petición hasta 2 veces en caso de error temporal
        map(response => {
          console.log('Datos recibidos:', response);
          return response;
        }),
        catchError(this.handleError), // Manejo de errores centralizado
        shareReplay(1) // Mantiene la última respuesta en caché
      );
    }
    return this.cache$;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      // Error del cliente (navegador)
      errorMessage = `Error del cliente: ${error.error.message}`;
    } else {
      // Error del servidor
      errorMessage = `Error del servidor (Código ${error.status}): ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage)); // Lanza el error para que el componente lo maneje
  }
  

}
