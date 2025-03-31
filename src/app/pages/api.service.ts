import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from './interfaces/Character-interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public api='https://rickandmortyapi.com/api/character'
  public characters:Character[]=[];
  public charactersCopy=[...this.characters]

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
