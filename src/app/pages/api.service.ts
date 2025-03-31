import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public api='https://rickandmortyapi.com/api/character'
  constructor(
    private http: HttpClient,
    // private router: Router,
    // private authService: AuthService,
    // private configService: ConfigService,
    // private store: Store<AppState>,
    // private actions$: Actions    
  ) { }

  getCharacters(){
    const characters = this.http.get(this.api);
    return characters;
  }
}
