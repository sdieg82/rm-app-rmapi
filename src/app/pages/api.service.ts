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
  
  getCharacters(page: number = 1, forceRefresh: boolean = false): Observable<Character> {
    const params = new HttpParams().set('page', page.toString()); // Agrega ?page=N como query param

    if (!this.cache$ || forceRefresh) {
      this.cache$ = this.http.get<Character>(this.api, { params }).pipe(
        retry(2),
        map(response => {
          console.log(`Datos de la página ${page}:`, response);
          return response;
        }),
        catchError(this.handleError),
        shareReplay(1)
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
